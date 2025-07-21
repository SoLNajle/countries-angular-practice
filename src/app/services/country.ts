import { Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private url = 'http://localhost:3000/countries';

  getAllCountries(): Promise<Country[]> {
    return fetch(this.url)
      .then((response) => response.json())
      .then((data) =>
        data.map((country: { name: string; code: string }) => ({
          name: country.name,
          code: country.code,
        })),
      )
      .catch((error) => {
        console.error('Error fetching countries:', error);
        throw error;
      });
  }

  getCountryByCode(code: string): Promise<Country | null> {
    return fetch(`${this.url}?code=${code}`)
      .then((response) => response.json())
      .then((countries) => (countries.length > 0 ? countries[0] : null))
      .catch((error) => {
        console.error('Error fetching country by code:', error);
        throw error;
      });
  }
}
