import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdministrativeComponent } from './administrative.component';
/*import { AdministrativeChartsPanelComponent } from './charts-panel/charts-panel.component';

import { AdminstrativeLegendChartComponent } from './legend-chart/legend-chart.component';*/
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
/*import { AdministrativeProgressSectionComponent } from './progress-section/progress-section.component';
import { AdministrativeVisitorsAnalyticsComponent } from './visitors-analytics/visitors-analytics.component';
import { AdministrativeVisitorsAnalyticsChartComponent } from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { AdministrativeVisitorsStatisticsComponent } from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { ProfitCardComponent } from './profit-card/profit-card.component';
import { StatsCardBackComponent } from './profit-card/back-side/stats-card-back.component';
import { StatsCardFrontComponent } from './profit-card/front-side/stats-card-front.component';
import { StatsBarAnimationChartComponent } from './profit-card/front-side/stats-bar-animation-chart.component';
import { StatsAreaChartComponent } from './profit-card/back-side/stats-area-chart.component';


import { EarningCardComponent } from './earning-card/earning-card.component';
import { EarningCardFrontComponent } from './earning-card/front-side/earning-card-front.component';
import { EarningPieChartComponent } from './earning-card/back-side/earning-pie-chart.component';
import { EarningLiveUpdateChartComponent } from './earning-card/front-side/earning-live-update-chart.component';
import { EarningCardBackComponent } from './earning-card/back-side/earning-card-back.component'; */

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
import { MachineChartsPanelComponent } from './charts-machine-panel/charts-panel.component';
import { OrdersMachineChartComponent } from './charts-machine-panel/charts/orders-chart.component';
import { ProfitMachineChartComponent } from './charts-machine-panel/charts/profit-chart.component';
import { ChartMachinePanelHeaderComponent } from './charts-machine-panel/chart-panel-header/chart-panel-header.component';
import { ChartMachinePanelSummaryComponent } from './charts-machine-panel/chart-panel-summary/chart-panel-summary.component';

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
  ],
  declarations: [
    AdministrativeComponent,
    /*AdministrativeChartsPanelComponent,

    OrdersChartComponent,
    ProfitChartComponent,
    AdminstrativeLegendChartComponent,
    AdministrativeProgressSectionComponent,
    SlideOutComponent,
    AdministrativeVisitorsAnalyticsComponent,
    AdministrativeVisitorsAnalyticsChartComponent,
    AdministrativeVisitorsStatisticsComponent,

    ProfitCardComponent,
    StatsCardBackComponent,
    StatsCardFrontComponent,
    StatsBarAnimationChartComponent,
    StatsAreaChartComponent,





    EarningCardComponent,
    EarningCardFrontComponent,
    EarningCardBackComponent,
    EarningPieChartComponent,
    EarningLiveUpdateChartComponent,
   // AdministrativeDialogComponent,
   // ClientDialogComponent


*/
    OrdersMachineChartComponent,
    ProfitMachineChartComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    PieChartComponent,
    OperatorChartsPanelComponent,
    MachineChartsPanelComponent,
    ECommerceLegendChartComponent,
    StatusCardComponent,
    TrafficRevealCardComponent,

    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    ChartPanelSummaryComponent,
    ChartMachinePanelSummaryComponent,
    ChartPanelHeaderComponent,
    ChartMachinePanelHeaderComponent,
  ],
  providers: [

  ],
})
export class AdministrativeModule { }
