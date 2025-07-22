import { Component, inject, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { provideEchartsCore, NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
echarts.use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ToolboxComponent,
  MapChart,
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
  chartOption!: EChartsOption;
  private http = inject(HttpClient);

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.get('assets/world.json').subscribe((worldMap: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      echarts.registerMap('world', worldMap as any);
      this.chartOption = {
        title: {
          text: 'Countries Visited',
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 1,
          inRange: {
            color: ['#eeeeee', '#a50026'],
          },
          text: ['Visited'],
          calculable: true,
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
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
            name: 'World Population',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              show: false,
            },
            zoom: 1.0,
            data: [
              { name: 'China', value: 0 },
              { name: 'India', value: 0 },
              { name: 'United States', value: 1 },
              { name: 'Indonesia', value: 1 },
              { name: 'Pakistan', value: 0 },
              { name: 'Brazil', value: 1 },
              { name: 'Nigeria', value: 0 },
              { name: 'Bangladesh', value: 0 },
              { name: 'Russia', value: 0 },
              { name: 'Mexico', value: 0 },
            ],
          },
        ],
      };
    });
  }
}
