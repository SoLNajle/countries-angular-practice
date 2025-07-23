import { Capital } from './capital';

export interface Country {
  name: string;
  code: string;
}
export interface CountryWithCapital {
  name: string;
  code: string;
  flag_emoji: string;
  capital: Capital;
}
