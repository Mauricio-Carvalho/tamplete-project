import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { TruckFuelData } from '../../../../shared/model/truckFuelData';

@Component({
  selector: 'ngx-traffic-front-card',
  styleUrls: ['./traffic-front-card.component.scss'],
  templateUrl: './traffic-front-card.component.html',
})
export class TrafficFrontCardComponent implements OnDestroy {
  private alive = true;

  @Input() frontCardData: TruckFuelData[];

  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  trackByIdTruck(_, item: TruckFuelData) {
    return item.idTruck;
  }

  // Método para definir a cor do nível de combustível
  getFuelLevelColor(percentage: number): string {
    if (percentage >= 75) return 'green';
    if (percentage >= 50) return 'yellow';
    if (percentage >= 25) return 'orange';
    return 'red';
  }

  // Método para calcular quantos quadrados devem estar preenchidos
  getFilledLevels(percentage: number): number {
    return Math.ceil(percentage / 25); // Divide o percentual em 4 níveis (0-25%, 26-50%, 51-75%, 76-100%)
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
