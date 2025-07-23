import { Injectable, inject } from '@angular/core';
import { MapCountryData } from '../models/map-country-data';
import { MapCapitalData } from '../models/map-capital-data';
import { CountryService } from './country';
import { STAY_DURATION_VALUE_MAP } from '../data/stay-duration-value-map';
import { VisitedCountry } from '../models/visited-country';
import { VISIT_AMOUNTS_VALUE_MAP } from '../data/visit-amounts-value-map';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  countryService = inject(CountryService);
  getMapOptions(
    data_country: MapCountryData[],
    data_capital: MapCapitalData[],
  ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any {
    return {
      title: {
        text: 'Visited Countries Map',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          if (params.seriesType === 'effectScatter') {
            return this.getTooltipForCapital(params.value[2]);
          }
          return `${params.name}: ${params.value || 0}`;
        },
      },
      visualMap: {
        type: 'piecewise',
        show: true,
        left: 'right',
        top: 'bottom',
        pieces: [
          { value: 5, label: 'Lived', color: '#a50026' },
          { value: 4, label: 'Less than 6 Months', color: '#dd6773' },
          { value: 3, label: 'Less than a Month', color: '#f3989e' },
          { value: 2, label: 'Less than a Week', color: '#fbc9cb' },
          { value: 1, label: 'Airport', color: '#2ecc40' },
          { value: 0, label: 'Not Visited', color: '#eeeeee' },
        ],
        textStyle: {
          color: '#333',
        },
      },
      geo: {
        map: 'world',
        roam: true,
        label: { show: false },
        itemStyle: {
          areaColor: '#eee',
          borderColor: '#999',
        },
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'Visited',
          type: 'map',
          map: 'world',
          roam: true,
          label: { show: false },
          zoom: 1.0,
          itemStyle: {
            borderColor: '#000',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#a50026',
            },
          },
          data: data_country,
        },
        {
          name: 'Visit Count',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'fill', // or 'fill'
            scale: 1.5, // how much to grow
            period: 3, // speed of animation
          },
          symbolSize: function (val: number[]) {
            return val[2] * 5; // size scales with visit count
          },
          itemStyle: {
            color: '#000',
            shadowBlur: 10,
            shadowColor: '#000',
          },
          data: data_capital,
        },
      ],
    };
  }

  async formatCountryForMap(
    data: VisitedCountry[],
  ): Promise<MapCountryData[] | null> {
    const mappedData = await Promise.all(
      data.map(async (item) => {
        const country = await this.countryService.getCountryByCode(
          item.countryCode,
        );
        return {
          name: country ? country.name : 'Unknown Country',
          value: STAY_DURATION_VALUE_MAP[item.stayDuration] || 0,
        };
      }),
    );
    //removed unknown countries from mappedData
    mappedData.filter((item) => item.name !== 'Unknown Country');
    return mappedData;
  }

  async formatCapitalForMap(data: VisitedCountry[]): Promise<MapCapitalData[]> {
    const mappedData = await Promise.all(
      data.map(async (item) => {
        const country = await this.countryService.getCountryWithCapital(
          item.countryCode,
        );
        if (country && country.capital) {
          return {
            value: [
              country.capital.longitude,
              country.capital.latitude,
              VISIT_AMOUNTS_VALUE_MAP[item.visitAmount] || 0,
            ],
          };
        }
        return null;
      }),
    );
    // Filter out any nulls (countries not found)
    return mappedData.filter((item): item is MapCapitalData => !!item);
  }
  getTooltipForCapital(param_value: number): string {
    if (param_value === 0) {
      return 'Not Visited';
    }
    if (param_value === 1) {
      return '1 visit';
    }
    if (param_value === 5) {
      return 'lots of visits';
    }
    return `${param_value} visits`;
  }
}
