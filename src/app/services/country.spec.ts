import { TestBed } from '@angular/core/testing';

import { Country } from '../models/country';

describe('Country', () => {
  let service: Country;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Country);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
