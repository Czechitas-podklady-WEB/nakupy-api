import { defaultWeek } from "./default-data.js";
import { createItem, ProductList } from "./product-list.js";

export const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export type Day = typeof days[number];

export type Week = {
  [D in Day]: ProductList;
};

export const dayNames = {
  mon: 'Pondělí',
  tue: 'Úterý',
  wed: 'Středa',
  thu: 'Čtvrtek',
  fri: 'Pátek',
  sat: 'Sobota',
  sun: 'Neděle',
};

export const createDefaultList = (day: Day): ProductList => {
  return {
    id: day,
    dayName: dayNames[day],
    items: [...defaultWeek[day]],
  };
};

export const createEmptyList = (day: Day): ProductList => {
  return {
    id: day,
    dayName: dayNames[day],
    items: [],
  };
};

export const createDefaultWeek = (): Week => ({
  mon: createDefaultList('mon'),
  tue: createDefaultList('tue'),
  wed: createDefaultList('wed'),
  thu: createDefaultList('thu'),
  fri: createDefaultList('fri'),
  sat: createDefaultList('sat'),
  sun: createDefaultList('sun'),
});
