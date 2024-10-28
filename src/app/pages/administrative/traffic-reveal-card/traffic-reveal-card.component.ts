import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { TrafficBarData, TrafficBar } from '../../../@core/data/traffic-bar';
import { takeWhile } from 'rxjs/operators';
import { AnalyticalService } from '../analytical.service';
import { TruckFuelData } from '../../../shared/model/truckFuelData';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})

export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;
  revealed = false;
  period: string = 'week';
  truckFuelData: TruckFuelData[] = []; // Dados para o front-side
  trafficBarData: { data: number[], labels: string[], formatter: string } = { data: [], labels: [], formatter: '{c0}%' }; // Dados formatados para o gráfico do back-side

  constructor(private analyticalService: AnalyticalService) {
    this.getTruckFuelData(); // Buscar os dados de combustível
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  // Define o período e busca os dados
  setPeriodAndGetData(value: string): void {
    this.period = value;
    this.getTruckFuelData();
  }

  // Buscar dados de combustível dos caminhões
  getTruckFuelData() {
    this.analyticalService.getTruckFuelData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: TruckFuelData[]) => {
        this.truckFuelData = data;

        // Popular dados para o gráfico de barras
        this.trafficBarData = this.mapTruckFuelToBarData(this.truckFuelData);
      });
  }

  // Mapeia truckFuelData para o formato esperado para o gráfico de barras
  mapTruckFuelToBarData(truckFuelData: TruckFuelData[]): { data: number[], labels: string[], formatter: string } {
    const data = truckFuelData.map(truck => truck.fuelPercentageS10 + truck.fuelPercentageS500); // Total de combustível por caminhão
    const labels = truckFuelData.map(truck => truck.idTruck); // ID do caminhão como label

    return {
      data,
      labels,
      formatter: '{c0}%' // Formato do tooltip
    };
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
