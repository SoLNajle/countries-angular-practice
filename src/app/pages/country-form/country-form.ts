import { Component, computed } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from '../../services/country';
import { Country } from '../../models/country';
import { MatRadioModule } from '@angular/material/radio';
import { VISIT_AMOUNTS } from '../../data/visit-amounts.data';
import { STAY_DURATIONS } from '../../data/stay-durations.data';
import { VisitedCountry } from '../../models/visited-country';
import { CountryList } from '../../components/country-list/country-list';
import { signal } from '@angular/core';
import { getDescription } from '../../utils/option-description.util';

@Component({
  selector: 'app-country-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    CountryList,
  ],
  templateUrl: './country-form.html',
  styleUrl: './country-form.scss',
})
export class CountryFormComponent {
  private countryService = inject(CountryService);
  visitAmounts = VISIT_AMOUNTS;
  stayDurations = STAY_DURATIONS;
  countries: Country[] = [];
  countryFormEditing = false;
  countryIdToEdit: number | null = null;

  constructor() {
    this.countryService
      .getAllCountries()
      .then((countries) => {
        this.countries = countries;
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }

  countryForm = new FormGroup({
    countryCode: new FormControl(''),
    stayDuration: new FormControl(''),
    visitAmount: new FormControl(''),
  });

  VisitedCountries = signal<VisitedCountry[]>([]);

  addCountry() {
    if (this.countryForm.valid) {
      const newId = this.VisitedCountries().length + 1;
      const newCountry: VisitedCountry = {
        id: newId,
        countryCode: this.countryForm.value.countryCode as string,
        stayDuration: this.countryForm.value.stayDuration as string,
        visitAmount: this.countryForm.value.visitAmount as string,
      };
      this.VisitedCountries.update((countries) => [...countries, newCountry]);
      console.log('New country added:', this.VisitedCountries());
      this.countryForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  visitedCountriesDescription = computed(() => {
    return this.VisitedCountries().map((country) => ({
      ...country,
      id: country.id,
      countryName:
        this.countries.find((c) => c.code === country.countryCode)?.name ||
        'Unknown',
      stayDurationDescription: getDescription(
        this.stayDurations,
        country.stayDuration,
      ),
      visitAmountDescription: getDescription(
        this.visitAmounts,
        country.visitAmount,
      ),
    }));
  });
  deleteCountry(countryId: number): void {
    console.log('Deleting country with ID:', countryId);
    this.VisitedCountries.update((countries) =>
      countries.filter((country) => country.id !== countryId),
    );
  }

  editCountry(countryId: number): void {
    this.countryFormEditing = true;
    this.countryIdToEdit = countryId;
    const countryToEdit = this.VisitedCountries().find(
      (country) => country.id === countryId,
    );
    if (countryToEdit) {
      this.countryForm.patchValue({
        countryCode: countryToEdit.countryCode,
        stayDuration: countryToEdit.stayDuration,
        visitAmount: countryToEdit.visitAmount,
      });
    }
    console.log('Editing country with ID:', countryId);
  }

  updateCountry(): void {
    if (this.countryForm.valid) {
      const updatedCountry: VisitedCountry = {
        id: this.countryIdToEdit!,
        countryCode: this.countryForm.value.countryCode as string,
        stayDuration: this.countryForm.value.stayDuration as string,
        visitAmount: this.countryForm.value.visitAmount as string,
      };
      this.VisitedCountries.update((countries) =>
        countries.map((country) =>
          country.id === this.countryIdToEdit ? updatedCountry : country,
        ),
      );
      console.log('Country updated:', updatedCountry);
      this.countryForm.reset();
      this.countryFormEditing = false;
    } else {
      console.error('Form is invalid');
    }
  }
}
