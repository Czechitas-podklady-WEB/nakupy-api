import { Day } from './week.js';
import { ProductItem } from "./product-list.js";

export type DefaultWeek = {
  [D in Day]: ProductItem[];
}

export const defaultWeek: DefaultWeek = {
  mon: [
    {
      id: 'D90gKF7I',
      product: 'Rohlíky',
      amount: 10,
      unit: 'ks',
      done: true,
    },
    {
      id: 'F3jVjJTG',
      product: 'Máslo',
      amount: 500,
      unit: 'g',
      done: false,
    },
    {
      id: 'vUhZpKu5',
      product: 'Šunka',
      amount: 2,
      unit: 'balení',
      done: false,
    },
    {
      id: 'uqQHCOHp',
      product: 'Eidem',
      amount: 1,
      unit: 'balení',
      done: false,
    },
    {
      id: 'gRy7nj0R',
      product: 'Rajčata',
      amount: 400,
      unit: 'g',
      done: true,
    },
    {
      id: 'ywjIIcax',
      product: 'Okurky',
      amount: 2,
      unit: 'ks',
      done: true,
    },
    {
      id: 'PQacUJqB',
      product: 'Cibule',
      amount: 6,
      unit: 'ks',
      done: true,
    },
  ],
  tue: [
    {
      id: 'rr7mnYj1',
      product: 'Špagety',
      amount: 1,
      unit: 'balení',
      done: true,
    },
    {
      id: 'KX8zFFRZ',
      product: 'Mleté maso',
      amount: 500,
      unit: 'g',
      done: true,
    },
    {
      id: 'd9cq8JuJ',
      product: 'Pivo Kozel',
      amount: 6,
      unit: 'ks',
      done: true,
    },
  ],
  wed: [],
  thu: [
    {
      id: 'n4xXakh-',
      product: 'Sprchový gel',
      amount: 1,
      unit: 'ks',
      done: false,
    },
    {
      id: '14q9lp4q',
      product: 'Zubní kartáček',
      amount: 3,
      unit: 'ks',
      done: false,
    },
    {
      id: 'G91fhbT0',
      product: 'Zubní pasta',
      amount: 2,
      unit: 'ks',
      done: false,
    },
    {
      id: 'ZmADQA7_',
      product: 'Hřeben',
      amount: 2,
      unit: 'ks',
      done: false,
    },
    {
      id: 'xi8WK9o1',
      product: 'Kosmetická taška',
      amount: 1,
      unit: 'ks',
      done: false,
    },
  ],
  fri: [
    {
      id: 'l407Y961',
      product: 'Čokoláda 80%',
      amount: 1,
      unit: 'ks',
      done: true,
    },
    {
      id: 'h7Dulhsg',
      product: 'Minerální voda',
      amount: 1,
      unit: 'balení',
      done: true,
    },
    {
      id: '4XF7zeRp',
      product: 'Olivový olej',
      amount: 500,
      unit: 'ml',
      done: true,
    },
    {
      id: 'iV38lUIS',
      product: 'Jameson Whiskey',
      amount: 700,
      unit: 'ml',
      done: true,
    },
    {
      id: 'iw6oGok5',
      product: 'Brambůrky, solené',
      amount: 2,
      unit: 'balení',
      done: false,
    },
  ],
  sat: [
    {
      id: '6sw2DNim',
      product: 'Dobíjací baterie AAA',
      amount: 6,
      unit: 'ks',
      done: false,
    },
    {
      id: 'gKtZBeHH',
      product: 'LEGO Harry Potter',
      amount: 1,
      unit: 'ks',
      done: false,
    },
  ],
  sun: [],
};
