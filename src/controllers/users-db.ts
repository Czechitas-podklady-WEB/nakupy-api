import { nanoid } from "nanoid";
import { createDefaultWeek } from "../lists/weeks.js";
import { Week } from "../lists/week.js";
import { Result, fromNullable } from "monadix/result";

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
