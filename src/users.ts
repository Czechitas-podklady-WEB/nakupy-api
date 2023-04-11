import { Week } from "./lists/week.js";

export interface User {
  id: string,
  email: string,
  week: Week,
}
