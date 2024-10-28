import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-chart-machine-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartMachinePanelHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();
  @Output() yearChange = new EventEmitter<number>();   
  @Output() operatorsChange = new EventEmitter<string[]>();  // Novo evento para múltiplos operadores

  @Input() type: string = '1';  // Período (mês)
  @Input() selectedYear: number = new Date().getFullYear();  // Ano padrão
  @Input() selectedOperators: string[] = [];  // Operadores selecionados (array para múltiplos)

  types: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // Mês
  years: number[] = [2022, 2023, 2024];  // Anos disponíveis
  operators: string[] = ['Operador 1', 'Operador 2', 'Operador 3'];  // Simulando lista de operadores

  constructor(private themeService: NbThemeService) {}

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);  // Emite o novo período
  }

  changeYear(year: number): void {
    this.selectedYear = year;
    this.yearChange.emit(year);  // Emite o novo ano
  }

  changeOperators(operators: string[]): void {
    this.selectedOperators = operators;
    this.operatorsChange.emit(operators);  // Emite a lista de operadores selecionados
  }

  ngOnDestroy() {
    this.alive = false;
  }
}