
import {Component, OnDestroy} from '@angular/core';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { AnalyticalService } from './analytical.service';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs';
import { TruckFuelData } from '../../shared/model/truckFuelData';
import { MachineFilledPercentageDto } from '../../shared/model/machineFilledPercentageDto';


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

  machineNames: string[] = [];
  fuelAmounts: number[] = [];
  maxFuelAmount: number = 0;
  fuelTypes: string[] = [];
  showFuelMachines = false;


  terminals = [];
  queues = [];
  isSelected = false;

  truckFuelData: TruckFuelData[] = [];

  machineFuelData: MachineFilledPercentageDto[] = [];
  private alive = true;

  constructor(
              private analyticalService: AnalyticalService,
              private toastrService: NbToastrService,
              private translate: TranslateService) {
    this.countOperator();
    this.countMachine();
    this.countFuel();
    this.fetchTruckFuelData();
    this.fetchMachineFuelData(null, null);
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

  generateFakeMachineFuelData() {
    this.machineNames = ['Máquina 01', 'Máquina 02', 'Máquina 03', 'Máquina 04', 'Máquina 05'];
    this.fuelAmounts = this.machineNames.map(() => Math.floor(Math.random() * 500));

    const maxFuel = Math.max(...this.fuelAmounts); // Maior valor em fuelAmounts
    this.maxFuelAmount = maxFuel + 100; // Soma 500 ao maior valor
    console.log('maxFuelAmount: ' + this.maxFuelAmount)
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


  // Função para buscar os dados de abastecimento de máquinas
  fetchMachineFuelData(startDate: string, endDate: string) {
    this.showFuelMachines = false;
    this.analyticalService.getMachineFuelData(startDate, endDate)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data: MachineFilledPercentageDto[]) => {
          // Extrai os nomes das máquinas
          this.machineNames = data.map(machine => machine.name);

          // Extrai os valores abastecidos
          this.fuelAmounts = data.map(machine => machine.amountFilled);

          // Extrai os tipos de combustível
          this.fuelTypes = data.map(machine => machine.comb);

          // Calcula o maior valor abastecido + 100
          const maxFuel = Math.max(...this.fuelAmounts);
          this.maxFuelAmount = maxFuel + 100;

          console.log('machineNames:', this.machineNames);
          console.log('fuelAmounts:', this.fuelAmounts);
          console.log('fuelTypes:', this.fuelTypes);
          console.log('maxFuelAmount:', this.maxFuelAmount);
          this.showFuelMachines = true;
        },
        (error) => {
          // Trata o erro e exibe uma mensagem ao usuário
          this.toastrService.danger(
            this.translate.instant('toastr.fetch.error.message'),
            this.translate.instant('toastr.fetch.error.title')
          );
        }
      );

  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
