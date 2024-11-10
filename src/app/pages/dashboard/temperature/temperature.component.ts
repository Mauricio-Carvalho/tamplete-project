import { Component, OnDestroy } from '@angular/core';
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

  constructor(private themeService: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData,
              private analyticalService: AnalyticalService) {
    this.getTruckFuelData();
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.theme = config.variables.temperature;
      });
  }

  // Buscar dados de combustível dos caminhões
  getTruckFuelData() {
    this.analyticalService.getTruckFuelData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: TruckFuelData[]) => {
        this.truckFuelData = data;
        if (data.length > 0) {
          const truck = data[0]; // Exemplo com o primeiro caminhão, adaptar conforme necessário
          this.idTruck = truck.idTruck;
          this.model = truck.model;
          this.countFuelS10 = truck.countFuelS10;
          this.fuelPercentageS10 = truck.fuelPercentageS10;
          this.countFuelS500 = truck.countFuelS500;
          this.fuelPercentageS500 = truck.fuelPercentageS500;
          this.nfCombS10 = truck.nfCombS10;
          this.nfComb500 = truck.nfComb500;

          this.temperature = truck.fuelPercentageS10;
          this.humidity = truck.fuelPercentageS500;
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
