import { Component } from '@angular/core';
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
  ],
  templateUrl: './country-form.html',
  styleUrl: './country-form.scss',
})
export class CountryFormComponent {
  private countryService = inject(CountryService);
  visitAmounts = VISIT_AMOUNTS;
  stayDurations = STAY_DURATIONS;
  VisitedCountries: VisitedCountry[] = [];
  countries: Country[] = [];

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
    country: new FormControl(''),
    stayDuration: new FormControl(''),
    visitAmount: new FormControl(''),
  });

  addCountry() {
    if (this.countryForm.valid) {
      const newCountry: VisitedCountry = {
        country: this.countryForm.value.country as string,
        stayDuration: this.countryForm.value.stayDuration as string,
        visitAmount: this.countryForm.value.visitAmount as string,
      };
      this.VisitedCountries.push(newCountry);
      console.log('New country added:', this.VisitedCountries);
      this.countryForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is invalid');
    }
  }
}
