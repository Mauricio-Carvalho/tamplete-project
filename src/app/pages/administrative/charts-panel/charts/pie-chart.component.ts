// ngx-pie-chart.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-pie-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class PieChartComponent implements OnChanges {
  @Input() summarizedData: { description: string, value: number }[];

  options: any = {};

  constructor(private theme: NbThemeService) {}

  ngOnChanges() {
    if (this.summarizedData) {
      this.updateChartOptions();
    }
  }

  updateChartOptions() {
    this.theme.getJsTheme().subscribe(theme => {
      const eTheme: any = theme.variables.profit;

      // Adicione cores correspondentes às cores do gráfico de barras
      const colors = [
        eTheme.secondLineGradFrom,  // Cor para S10
        eTheme.thirdLineGradFrom,   // Cor para S500
      ];

      this.options = {
        backgroundColor: eTheme.bg,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          bottom: 10,
          textStyle: {
            color: eTheme.axisTextColor,
          },
        },
        series: [
          {
            name: 'Combustível',
            type: 'pie',
            radius: '50%',
            data: this.summarizedData.map((item, index) => ({
              name: item.description,
              value: item.value,
              itemStyle: {
                color: colors[index],  // Use as cores definidas acima
              },
            })),
            label: {
              color: eTheme.axisTextColor,
              fontSize: 12,
            },
            labelLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
              },
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    });
  }

}
