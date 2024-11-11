
import {Component, OnDestroy} from '@angular/core';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { AnalyticalService } from './analytical.service';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs';
import { TruckFuelData } from '../../shared/model/truckFuelData';


@Component({
  selector: 'ngx-administrative',
  styleUrls: ['./administrative.component.scss'],
  templateUrl: './administrative.component.html',
})
export class AdministrativeComponent {


  amountOperator: number = 0;
  amountMachine: number = 0;
  amountFuelS10: number = 0;
  amountFuelS500: number = 0;

  terminals = [];
  queues = [];
  isSelected = false;

  truckFuelData: TruckFuelData[] = [];
  private alive = true;

  constructor(
              private analyticalService: AnalyticalService,
              private toastrService: NbToastrService,
              private translate: TranslateService) {
    this.countOperator();
    this.countMachine();
    this.countFuel();
    this.fetchTruckFuelData();
  }

  countOperator() {
    this.analyticalService.countOperator()
      .then((amountOperator) => {
        this.amountOperator = amountOperator['count'];
      })
      .catch((response) => {
        this.toastrService.danger(this.translate.instant('toastr.create.error.message'), this.translate.instant('toastr.create.error.title'));
      });
  }

  countMachine() {
    this.analyticalService.countMachine()
      .then((amountMachine) => {
        this.amountMachine = amountMachine['count'];
      })
      .catch((response) => {
        this.toastrService.danger(this.translate.instant('toastr.create.error.message'), this.translate.instant('toastr.create.error.title'));
      });
  }

  countFuel() {
    this.analyticalService.countFuel()
      .then((fuelAll) => {
        this.amountFuelS10 = fuelAll['totalS10'];
        this.amountFuelS500 = fuelAll['totalS500'];
      })
      .catch((response) => {
        this.toastrService.danger(this.translate.instant('toastr.create.error.message'), this.translate.instant('toastr.create.error.title'));
      });
  }

  fetchTruckFuelData() {
    this.analyticalService.getTruckFuelData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: TruckFuelData[]) => {
        this.truckFuelData = data;
      });
    }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
