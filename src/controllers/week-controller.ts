import express, { Router } from 'express';
import { z } from 'zod';
import { Jsonder } from 'jsonder';
import { success } from 'monadix/result';
import { 
  addItem,
  deleteItem,
  findItem,
  MoveDirection,
  moveItem,
  ProductItemData,
  updateItem
} from '../lists/product-list.js';
import { days, Day, isDay, Week } from '../lists/week.js';
import { createDefaultList, createDefaultWeek, createEmptyList } from '../lists/weeks.js';

declare global {
  namespace Express {
    export interface Request {
      week?: Week;
    }
  }
}

interface WeekControllerOptions {
  isSampleWeek: boolean;
}

const defaultWeek = createDefaultWeek();

export const weekController = (api: Jsonder, options: WeekControllerOptions): Router => {
  const { isSampleWeek } = options;
  const router = express.Router();

  router.use((req, res, next) => {
    if (isSampleWeek) {
      req.week = defaultWeek;
    } else {
      req.week = req.apiUser!.week;
    }
    next();
  });
  
  router.get('/', api.endpoint({
    resourceType: 'week',
    handler: () => success(
      days.map(
        (day) => ({
          type: 'day',
          id: day,
        })
      )
    )
  }));

  const daySchema = z.object({
    day: z.enum(days),
  });

  router.get('/:day',
    api.endpoint({
      resourceType: 'day',
      validation: {
        paramsSchema: daySchema,
      },
      handler: (req) => {
        const { day } = req.params;  
        return success(req.week![day as Day]);
      },
    })
  );

  router.get('/:day/items',
    api.endpoint({
      resourceType: 'items',
      validation: {
        paramsSchema: daySchema,
      },
      handler: (req, res) => {
        const { day } = req.params;
        return success(req.week![day as Day].items);
      },
    })
  );

  router.get('/:day/items/:itemId',
    api.endpoint({
      resourceType: 'item',
      validation: {
        paramsSchema: daySchema,
      },
      handler: (req, res) => {
        const { itemId } = req.params;
        const day = req.params.day as Day;
        const list = req.week![day];
        
        return findItem(list, itemId).orElse(() => ({
          status: 404,
          code: 'not_found',
          detail: `Item with id '${itemId}' not found`,
        }));
      },
    })
  );

  if (isSampleWeek) {
    return router;
  }

  router.patch(
    `/:day/items/:itemId`,
    api.endpoint({
      resourceType: 'item',
      validation: {
        paramsSchema: daySchema,
        bodySchema: z.object({
          product: z.string().trim().min(2).optional(),
          amount: z.number().int().min(1).optional(),
          unit: z.string().trim().min(1).optional(),
          done: z.boolean().optional(),
        }),
      },
      handler: (req) => {
        const itemData = req.body as Partial<ProductItemData>;
        const day = req.params.day as Day;
        const list = req.week![day];
        const { itemId } = req.params;
      
        return updateItem(list, itemId, itemData).orElse(() => ({
          status: 404,
          code: 'not_found',
          detail: `Item with id '${itemId}' not found`,
        }));
      },
    })
  );

  router.delete(
    `/:day/items/:itemId`, 
    api.endpoint({
      resourceType: 'day',
      validation: {
        paramsSchema: daySchema,
      },
      handler: (req) => {
        const { itemId } = req.params;
        const day = req.params.day as Day;
        const list = req.week![day];

        return deleteItem(list, itemId).orElse(() => ({
          status: 404,
          code: 'not_found',
          detail: `Item with id '${itemId}' not found`,
        }));
      },
    })
  );

  router.post(
    `/:day/items/:itemId/actions`,
    api.endpoint({
      resourceType: 'day',
      validation: {
        paramsSchema: daySchema,
        bodySchema: z.object({
          type: z.enum(['moveUp', 'moveDown']),
        }),
      },
      handler: (req) => {
        const { itemId } = req.params;
        const day = req.params.day as Day;
        const direction = req.body.type as MoveDirection;
        const list = req.week![day];

        return moveItem(list, itemId, direction).orElse(() => ({
          status: 404,
          code: 'not_found',
          detail: `Item with id '${itemId}' not found`,
        }));
      },
    })
  );

  router.post(
    `/:day/items`,
    api.endpoint({
      resourceType: 'day',
      validation: {
        paramsSchema: daySchema,
        bodySchema: z.object({
          product: z.string().trim().min(2),
          amount: z.number().int().min(1),
          unit: z.string().trim().min(1),
          done: z.boolean().optional(),
        }),
      },
      handler: (req) => {
        const itemData = req.body as ProductItemData;
        const { day } = req.params;
        
        const list = req.week![day as Day];
        return addItem(list, itemData).orElse(() => ({
          status: 400,
          code: 'limit_reached',
          detail: 'The list already contains maximum number of items',
        }));
      },
    })
  );

  router.post(
    `/:day/actions`,
    api.endpoint({
      resourceType: 'day',
      validation: {
        paramsSchema: daySchema,
        bodySchema: z.object({
          type: z.enum(['reset', 'clear']),
        }),
      },
      handler: (req) => {
        const { type } = req.body;
        const day = req.params.day as Day;

        if (type === 'reset') {
          req.week![day] = createDefaultList(day);
        } else if (type === 'clear') {
          req.week![day] = createEmptyList(day);
        }

        return success(req.week![day]);
      },
    })
  );

  return router;
};
