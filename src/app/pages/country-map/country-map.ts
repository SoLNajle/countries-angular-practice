import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country';
import { EChartsOption } from 'echarts';
import { provideEchartsCore, NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
} from 'echarts/components';
import { MapChart, EffectScatterChart } from 'echarts/charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MapService } from '../../services/map';
import { MapCountryData } from '../../models/map-country-data';
import { MapCapitalData } from '../../models/map-capital-data';
import { VisitedCountry } from '../../models/visited-country';
echarts.use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
  MapChart,
  EffectScatterChart,
]);

@Component({
  selector: 'app-country-map',
  standalone: true,
  imports: [NgxEchartsModule, HttpClientModule],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './country-map.html',
  styleUrls: ['./country-map.scss'],
})
export class CountryMap implements OnInit {
  private countryService = inject(CountryService);
  private mapService = inject(MapService);
  chartOption!: EChartsOption;
  private http = inject(HttpClient);
  data_country: MapCountryData[] = [];
  data_capital: MapCapitalData[] = [];
  visitedCountries: VisitedCountry[] = [];

  async ngOnInit(): Promise<void> {
    this.visitedCountries = this.countryService.getFromLocalStorage();
    this.data_country =
      (await this.mapService.formatCountryForMap(this.visitedCountries)) ?? [];

    this.data_capital = [
      { value: [-99.1332, 19.4326, 1] },
      { value: [2.3522, 48.8566, 5] },
      { value: [74.3587, 31.5204, 10] },
      { value: [-74.006, 40.7128, 3] },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.get('assets/world.json').subscribe((worldMap: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      echarts.registerMap('world', worldMap as any);

      this.chartOption = this.mapService.getMapOptions(
        this.data_country,
        this.data_capital,
      );
    });
  }

  getCountryWcapital(countryCode: string): void {
    console.log('Fetching country with capital for code:', countryCode);
    const visitedCountries = this.countryService.getFromLocalStorage();
    console.log('Visited countries from local storage:', visitedCountries);
    this.countryService.getCountryWithCapital(countryCode).then((country) => {
      console.log('Country with capital:', country);
    });
    //get country information from lcoal storage
  }
}
