import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdministrativeComponent } from './administrative.component';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NbDatepickerModule } from '@nebular/theme';

import { TrafficRevealCardComponent } from './traffic-reveal-card/traffic-reveal-card.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { TrafficBarChartComponent } from './traffic-reveal-card/back-side/traffic-bar-chart.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/traffic-front-card.component';
import { TrafficBackCardComponent } from './traffic-reveal-card/back-side/traffic-back-card.component';
import { TrafficBarComponent } from './traffic-reveal-card/front-side/traffic-bar/traffic-bar.component';
import { TrafficCardsHeaderComponent } from './traffic-reveal-card/traffic-cards-header/traffic-cards-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { PieChartComponent } from './charts-panel/charts/pie-chart.component';
import { OperatorChartsPanelComponent } from './charts-panel/charts-panel.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { MachineChartComponent } from './machine-fuel-bar-chart/machine-chart.component';

@NgModule({
  imports: [
    NbPopoverModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
  declarations: [
    AdministrativeComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    PieChartComponent,
    OperatorChartsPanelComponent,
    ECommerceLegendChartComponent,
    StatusCardComponent,
    TrafficRevealCardComponent,

    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    ChartPanelSummaryComponent,
    ChartPanelHeaderComponent,
    TemperatureDraggerComponent,
    TemperatureComponent,
    MachineChartComponent,
  ],
  providers: [

  ],
})
export class AdministrativeModule { }
