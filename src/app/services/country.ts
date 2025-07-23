import { Injectable } from '@angular/core';
import { Country, CountryWithCapital } from '../models/country';
import { VisitedCountry } from '../models/visited-country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private url_country = 'http://localhost:3000/countries';
  private url_countries_capital = 'http://localhost:3000/countries_w_capital';

  getAllCountries(): Promise<Country[]> {
    return fetch(this.url_country)
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
    return fetch(`${this.url_country}?code=${code}`)
      .then((response) => response.json())
      .then((countries) => (countries.length > 0 ? countries[0] : null))
      .catch((error) => {
        console.error('Error fetching country by code:', error);
        throw error;
      });
  }

  saveToLocalStorage(countries: VisitedCountry[]): void {
    localStorage.setItem('visitedCountries', JSON.stringify(countries));
  }

  getFromLocalStorage(): VisitedCountry[] {
    const data = localStorage.getItem('visitedCountries');
    return data ? JSON.parse(data) : [];
  }

  getCountryWithCapital(
    countryCode: string,
  ): Promise<CountryWithCapital | null> {
    return fetch(`${this.url_countries_capital}?code=${countryCode}`)
      .then((response) => response.json())
      .then((data) => (data.length > 0 ? data[0] : null))
      .catch((error) => {
        console.error('Error fetching country with capital:', error);
        throw error;
      });
  }

  getCountryNameByCode(code: string): string {
    this.getCountryByCode(code).then((country) => {
      if (country) {
        return country.name;
      } else {
        return 'Unknown Country';
      }
    });
    return 'Unknown Country'; // Default return value if the promise is not resolved
  }
}
