import { Component, Input, signal } from '@angular/core';
import { VisitedCountry } from '../../models/visited-country';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-country-list',
  imports: [MatTableModule],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss',
})
export class CountryList {
  @Input() countries: VisitedCountry[] = [];
  // Using signal to manage the state of the countries list
  VisitedCountries = signal<VisitedCountry[]>(this.countries);
  displayedColumns: string[] = ['country', 'stayDuration', 'visitAmount'];
}
