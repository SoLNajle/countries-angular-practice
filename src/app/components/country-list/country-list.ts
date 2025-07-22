import { Component, Input, signal, Output, EventEmitter } from '@angular/core';
import { VisitedCountry } from '../../models/visited-country';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-country-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss',
})
export class CountryList {
  @Input() countries: VisitedCountry[] = [];
  @Input() countryFormEditing = false;
  // emit event when a country is deleted so country-form can update its state passing the countryId
  @Output() countryDeleted = new EventEmitter<number>();
  // emit event when a country is edited so country-form can update its state
  @Output() countryEdited = new EventEmitter<number>();
  VisitedCountries = signal<VisitedCountry[]>(this.countries);
  displayedColumns: string[] = [
    'country',
    'stayDuration',
    'visitAmount',
    'actionButtons',
  ];

  deleteCountry(countryId: number): void {
    console.log('Deleting country:', countryId);
    this.countryDeleted.emit(countryId);
  }

  editCountry(countryId: number): void {
    console.log('Editing country:', countryId);
    this.countryEdited.emit(countryId);
  }
}
