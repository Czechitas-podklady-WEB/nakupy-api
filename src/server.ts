import express from 'express';
import { weekController } from './week-controller.js';
import { findUser, createUser, User } from './db/users.js';
import jsonder from 'jsonder';
import { success } from 'monadix/result';

declare global {
  namespace Express {
    export interface Request {
      apiUser?: User;
    }
  }
}

interface ServerOptions {
  serverUrl: string;
}

export const createServer = ({ serverUrl }: ServerOptions) => {
  const server = express();

  server.use(`/assets/recipes`, express.static('public/assets/recipes', {
    extensions: ['png'],
  }));

  const api = jsonder({
    generateUrls: {
      serverUrl,
    }
  });
      
  server.use('/api', api.middleware());

  server.get('/api',
    api.endpoint({
      resourceType: 'root',
      handler: () => success({
        id: 'root',
        message: 'Welcome to the Nákupy API',
        docs: `${serverUrl}/docs`,
      }),
    }),
  );

  server.use('/api/sampleweek', weekController(api, { isSampleWeek: true }));
  
  server.use(
    '/api/me',
    (req, res, next) => {
      const login = req.headers.authorization;
      if (!login) {
        res.status(401).send({
          status: 401,
          code: 'unauthorized',
          detail: 'Unauthorized',
        });
        return;
      }

      findUser(login).match({
        success(user) {
          req.apiUser = user;
          next();
        },
        fail() {
          createUser(login).match({
            success(user) {
              req.apiUser = user;
              next();
            },
            fail() {
              res.status(500).send({
                status: 500,
                code: 'user-creation-failed',
                detail: 'User creation failed',
              });
            },
          });  
        },
      });
    },
  );

  server.get(
    '/api/me',
    api.endpoint({
      resourceType: 'user',
      handler: (req) => findUser(req.headers.authorization ?? '').orElse(() => ({
        status: 404,
        code: 'not_found',
        detail: 'User not found',
      }))
    }),
  );

  server.use('/api/me/week',
    weekController(api, { isSampleWeek: false }),
  );

  return server;
};
