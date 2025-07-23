import { Injectable, inject } from '@angular/core';
import { MapCountryData } from '../models/map-country-data';
import { MapCapitalData } from '../models/map-capital-data';
import { CountryService } from './country';
import { STAY_DURATION_VALUE_MAP } from '../data/stay-duration-value-map';
import { VisitedCountry } from '../models/visited-country';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  countryService = inject(CountryService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMapOptions(
    data_country: MapCountryData[],
    data_capital: MapCapitalData[],
  ): any {
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
            return `${params.value[2]} ${params.value[2] > 1 ? 'visits' : 'visit'}`;
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

  //need to format data for map
  async formatCountryForMap(
    data: VisitedCountry[],
  ): Promise<MapCountryData[] | null> {
    // countryCode: "AX"id: 8 stayDuration: "justAirport"visitAmount: "1"
    // find country name by code
    const mappedData = await Promise.all(
      data.map(async (item) => {
        console.log('Mapping item:', item);
        const country = await this.countryService.getCountryByCode(
          item.countryCode,
        );
        console.log('Country fetched:', country);
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
}
