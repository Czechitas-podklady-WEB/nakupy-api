import { nanoid } from "nanoid";
import { Week, createDefaultWeek } from "./week.js";
import { Result, success, fromNullable } from "monadix/result";

export interface User {
  id: string,
  login: string,
  week: Week,
}

export const users: User[] = [];

export const findUser = (login: string): Result<User, 'not-found'> => fromNullable(
  users.find((user) => user.login === login), 'not-found',
);

export const createUser = (login: string): Result<User, never> => {
  const user = {
    id: nanoid(8),
    login,
    week: createDefaultWeek(),
  };

  users.push(user);
  return success(user);
}
