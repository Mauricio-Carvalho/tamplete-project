import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MachineService } from '../../../../shared/services/machine.service';
import { Machine } from '../../../../shared/model/machine';


@Component({
  selector: 'ngx-chart-machine-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartMachinePanelHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();
  @Output() yearChange = new EventEmitter<number>();
  @Output() machinesChange = new EventEmitter<string[]>();  // Novo evento para múltiplos operadores

  @Input() type: string = '1';  // Período (mês)
  @Input() selectedYear: number = new Date().getFullYear();  // Ano padrão
  @Input() selectedMachines: string[] = [];  // Operadores selecionados (array para múltiplos)

  types: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // Mês
  years: number[] = [2022, 2023, 2024];  // Anos disponíveis
  machines: Machine[] = [];  // Simulando lista de operadores

  constructor(private themeService: NbThemeService,
              private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineService.getMachines()  // Busca operadores do serviço
      .subscribe(response => {
        // Filtra os operadores e armazena `idOp` e `name`
        this.machines = response.content.map(op => ({ name: op.name }));
      });
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);  // Emite o novo período
  }

  changeYear(year: number): void {
    this.selectedYear = year;
    this.yearChange.emit(year);  // Emite o novo ano
  }

  changeMachines(machines: string[]): void {
    this.selectedMachines = machines;
    this.machinesChange.emit(machines);  // Emite a lista de operadores selecionados
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
