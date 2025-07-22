import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMap } from './country-map';

describe('CountryMap', () => {
  let component: CountryMap;
  let fixture: ComponentFixture<CountryMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMap],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
