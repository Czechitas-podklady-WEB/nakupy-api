import { nanoid } from "nanoid";
import { Week, createDefaultWeek } from "./week.js";
import { Result, success, fromNullable } from "monadix/result";

export interface User {
  id: string,
  email: string,
  week: Week,
}

export const users: User[] = [
  {
    id: nanoid(8),
    email: 'podlouckymartin@gmail.com',
    week: createDefaultWeek(),
  }
];

export const findUser = (email: string): Result<User, 'not-found'> => fromNullable(
  users.find((user) => user.email === email), 'not-found',
);

export const createUser = (email: string): Result<User, never> => {
  const user = {
    id: nanoid(8),
    email,
    week: createDefaultWeek(),
  };

  users.push(user);
  return success(user);
}
