import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { AnalyticalService } from '../analytical.service';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OperatorChartSummary } from '../../../shared/model/operatorChartSummary';

@Component({
  selector: 'ngx-operator-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class OperatorChartsPanelComponent implements OnDestroy, OnInit {
  private alive = true;
  summarizedData: OperatorChartSummary[] = [
    {
        "description": "Combustível S10 abastecido:",
        "value": 0
    },
    {
        "description": "Combustível S500 abastecido:",
        "value": 0
    }
];

  dataLoaded = false;

  period: string = '10';  // Período (mês)
  selectedYear: number = new Date().getFullYear();  // Ano atual
  selectedOperators: string[] = [];  // Operadores selecionados (array para múltiplos)
  profitChartData: any;

  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private analyticalService: AnalyticalService,) {}
  ngOnInit(): void {
    this.setPeriodAndGetChartData('10');
  }

  getProfitChartData(year: number, month: number, operators: string[]) {
    console.log("Parametros: " + year + ' - ' + month + ' - ' + operators);

    this.analyticalService.getFuelByOperators(year, month, operators)
      .pipe(takeWhile(() => this.alive))
      .subscribe(fuelData => {
        // Monte o objeto esperado pelo ProfitChartComponent
        this.profitChartData = {
          chartLabel: fuelData.map(d => d.date),  // Datas
          data: [
            fuelData.map(d => d.fuelS10),  // Valores de S10
            fuelData.map(d => d.fuelS500),  // Valores de S500
            fuelData.map(d => d.totalFuel),  // Total (S10 + S500)
          ],
        };

        // Calcula o total de S10 e S500
        const totalS10 = fuelData.reduce((sum, item) => sum + item.fuelS10, 0);
        const totalS500 = fuelData.reduce((sum, item) => sum + item.fuelS500, 0);

        // Atualiza summarizedData com os novos valores
        this.summarizedData = [
          {
            "description": "Combustível S10 abastecido:",
            "value": parseFloat(totalS10.toFixed(2)),  // Mantém duas casas decimais
          },
          {
            "description": "Combustível S500 abastecido:",
            "value": parseFloat(totalS500.toFixed(2)),  // Mantém duas casas decimais
          },
        ];

        this.dataLoaded = true;
      });
  }


  // Captura a mudança de período (mês)
  setPeriodAndGetChartData(period: string): void {
    this.period = period;
    this.getProfitChartDataMock(this.selectedYear, parseInt(period), this.selectedOperators);
  }

  // Captura a mudança de ano
  setYearAndGetChartData(year: number): void {
    this.selectedYear = year;
    this.getProfitChartDataMock(year, parseInt(this.period), this.selectedOperators);
  }

  // Captura a mudança de operador
  setOperatorsAndGetChartData(operators: string[]): void {
    this.selectedOperators = operators;
    this.getProfitChartDataMock(this.selectedYear, parseInt(this.period), operators);
  }

  /*
  // Este método é chamado quando o usuário muda o período (mês)
  setPeriodAndGetChartData(month: string): void {
    const year = new Date().getFullYear();  // Pegue o ano atual
    this.period = month;  // Atualize a propriedade period
    //this.getProfitChartData(year, parseInt(month));  // Filtre por mês
    this.getProfitChartDataMock(year, parseInt(month));
  } */

  ngOnDestroy() {
    this.alive = false;
  }

  

  // Gera a massa de dados fictícia
  getMockFuelData(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();  // Obtenha o número de dias no mês
    const mockData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      const fuelS10 = this.getRandomFuelAmount();  // Gera um valor aleatório para S10
      const fuelS500 = this.getRandomFuelAmount();  // Gera um valor aleatório para S500
      const totalFuel = fuelS10 + fuelS500;

      mockData.push({
        date: date,
        fuelS10: fuelS10,
        fuelS500: fuelS500,
        totalFuel: totalFuel,
      });
    }

    return mockData;
  }

  getRandomFuelAmount(): number {
    // Gera um valor de combustível entre 0 e 500 e arredonda para duas casas decimais
    return Number((Math.random() * 500).toFixed(2));
  }

  // Método para popular o gráfico com dados simulados
  getProfitChartDataMock(year: number, month: number, operators: string[]) {
    // Gere a massa de dados fictícia
    const fuelData = this.getMockFuelData(year, month);

    // Monte o objeto esperado pelo ProfitChartComponent
    this.profitChartData = {
      chartLabel: fuelData.map(d => d.date),  // Datas
      data: [
        fuelData.map(d => d.fuelS10),  // Valores de S10
        fuelData.map(d => d.fuelS500),  // Valores de S500
        fuelData.map(d => d.totalFuel),  // Total (S10 + S500)
      ],
    };
  }
  
}
