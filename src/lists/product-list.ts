import { nanoid } from "nanoid";
import { Result, success, fail } from 'monadix/result';

const ID_SIZE = 8;
const MAX_ITEMS = 64;

export interface ProductItemData {
  product: string,
  amount: number,
  unit: string,
  done: boolean,
}

export type ProductItem = {
  id: string,
} & ProductItemData;

export interface ProductList {
  id: string,
  dayName: string,
  items: ProductItem[],
};

export const findItemIndex = (
  list: ProductList, itemId: string
): Result<number, 'not-found'> => {
  const index = list.items.findIndex((item) => item.id === itemId);
  if (index === -1) {
    return fail('not-found');
  }

  return success(index);
}

export const findItem = (
  list: ProductList, itemId: string
): Result<ProductItem, 'not-found'> => findItemIndex(list, itemId).map(
  (index) => list.items[index]
);

export const createItem = (itemData: ProductItemData): ProductItem => ({
  id: nanoid(ID_SIZE),
  ...itemData,
});

export const addItem = (
  list: ProductList, itemData: ProductItemData,
): Result<ProductList, 'max-items'> => {
  if (list.items.length === MAX_ITEMS) {
    return fail('max-items');
  }
  
  list.items.push(createItem(itemData));
  return success(list);
};

export const updateItem = (
  list: ProductList, itemId: string, values: Partial<ProductItemData>,
): Result<ProductItem, 'not-found'> => findItemIndex(list, itemId).map(
  (index) => {
    const item = list.items[index];
    const newItem: ProductItem = {
      id: item.id,
      product: values.product ?? item.product,
      amount: values.amount ?? item.amount,
      unit: values.unit ?? item.unit,
      done: values.done ?? item.done,
    };

    list.items[index] = newItem;
    return newItem;
  }
);

export const deleteItem = (
  list: ProductList, itemId: string,
): Result<ProductList, 'not-found'> => findItemIndex(list, itemId).map(
  (index) => {
    list.items.splice(index, 1);
    return list;
  }
);

export type MoveDirection = 'moveUp' | 'moveDown';

export const moveItem = (
  list: ProductList, itemId: string, direction: MoveDirection
): Result<ProductList, 'not-found'> => findItemIndex(list, itemId).map(
  (index) => {
    if (direction === 'moveUp') {
      if (index === 0) {
        return list;
      }
  
      const swap = list.items[index - 1];
      list.items[index - 1] = list.items[index];
      list.items[index] = swap;
  
      return list;
    }
  
    if (index === (list.items.length - 1)) {
      return list;
    }
  
    const swap = list.items[index + 1];
    list.items[index + 1] = list.items[index];
    list.items[index] = swap;
  
    return list;
  }
);
