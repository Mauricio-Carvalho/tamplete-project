import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { AnalyticalService } from '../analytical.service';
import { TruckFuelData } from '../../../shared/model/truckFuelData';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  private alive = true;
  @Input() truckData: TruckFuelData;

  truckFuelData: TruckFuelData[] = [];
  temperature: number;
  humidity: number;
  theme: any;
  themeSubscription: any;

  // Definindo as propriedades específicas para exibição
  idTruck: string;
  model: string;
  countFuelS10: number;
  fuelPercentageS10: number;
  countFuelS500: number;
  fuelPercentageS500: number;
  nfCombS10: string;
  nfComb500: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.theme = config.variables.temperature;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
