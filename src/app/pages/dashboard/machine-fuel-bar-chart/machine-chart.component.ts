import { Component, Input, OnDestroy, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import * as echarts from 'echarts';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-machine-fuel-chart',
  styleUrls: ['./machine-chart.component.scss'],
  template: `
    <div echarts
         [options]="options"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class MachineChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() machineNames: string[] = [];
  @Input() fuelAmounts: number[] = [];
  @Input() maxFuelAmount: number;
  @Input() fuelTypes: string[] = []; // Novo array para os tipos de combustível

  private alive = true;
  options: any = {};
  echartsInstance: any;

  constructor(private theme: NbThemeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fuelAmounts && !changes.fuelAmounts.isFirstChange()) {
      this.updateChartData();
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const chartTheme: any = config.variables.countryOrders;

        this.options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params) => {
              const index = params[2]?.dataIndex; // Índice da série do gradiente
              const machineName = this.machineNames[index]; // Nome da máquina
              const fuelAmount = params[2]?.value; // Valor abastecido
              const fuelType = this.fuelTypes[index]; // Tipo de combustível
              return `${machineName}: ${fuelAmount} L<br>Combustível: ${fuelType}`;
            },
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            max: this.maxFuelAmount,
            axisLabel: {
              color: chartTheme.chartAxisTextColor,
              fontSize: chartTheme.chartAxisFontSize,
            },
            axisLine: {
              lineStyle: {
                color: chartTheme.chartAxisLineColor,
                width: 2,
              },
            },
            axisTick: { show: false },
            splitLine: {
              lineStyle: {
                color: chartTheme.chartAxisSplitLine,
                width: 1,
              },
            },
          },
          yAxis: {
            type: 'category',
            data: this.machineNames,
            axisLabel: {
              color: chartTheme.chartAxisTextColor,
              fontSize: chartTheme.chartAxisFontSize,
            },
            axisLine: {
              lineStyle: {
                color: chartTheme.chartAxisLineColor,
                width: 2,
              },
            },
            axisTick: { show: false },
          },
          series: [
            { // Shadow bar
              type: 'bar',
              data: this.machineNames.map(() => this.maxFuelAmount),
              cursor: 'default',
              itemStyle: {
                color: chartTheme.chartInnerLineColor,
                opacity: 1,
              },
              barWidth: '40%',
              barGap: '-100%',
              barCategoryGap: '30%',
              animation: false,
              z: 1,
            },
            { // Bottom line
              type: 'bar',
              data: this.fuelAmounts,
              cursor: 'default',
              itemStyle: {
                color: chartTheme.chartLineBottomShadowColor,
                opacity: 1,
              },
              barWidth: '40%',
              barGap: '-100%',
              barCategoryGap: '30%',
              z: 2,
            },
            { // Gradient bar
              type: 'bar',
              barWidth: '35%',
              data: this.fuelAmounts,
              cursor: 'default',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: chartTheme.chartGradientFrom },
                  { offset: 1, color: chartTheme.chartGradientTo },
                ]),
              },
              z: 3,
            },
          ],
        };
      });
  }

  updateChartData() {
    if (this.echartsInstance) {
      this.echartsInstance.setOption({
        series: [
          {
            data: this.machineNames.map(() => this.maxFuelAmount),
          },
          {
            data: this.fuelAmounts,
          },
          {
            data: this.fuelAmounts,
          },
        ],
      });
    }
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
