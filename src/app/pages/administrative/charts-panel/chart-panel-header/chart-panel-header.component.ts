import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import {  NbThemeService } from '@nebular/theme';
import { OperatorService } from '../../../../shared/services/operator.service';
import { Operator } from '../../../../shared/model/operator';


@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy, OnInit  {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();
  @Output() yearChange = new EventEmitter<number>();   
  @Output() operatorsChange = new EventEmitter<string[]>();  // Novo evento para múltiplos operadores

  @Input() type: string = '1';  // Período (mês)
  @Input() selectedYear: number = new Date().getFullYear();  // Ano padrão
  @Input() selectedOperators: string[] = [];  // Operadores selecionados (array para múltiplos)

  types: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; // Mês
  years: number[] = [2022, 2023, 2024];  // Anos disponíveis
  operators: Operator[] = [];  // Lista de operadores com `idOp` e `name`

  constructor(private themeService: NbThemeService,
              private operatorService: OperatorService
  ) {}

  ngOnInit(): void {
    this.operatorService.getOperators()  // Busca operadores do serviço
      .subscribe(response => {
        // Filtra os operadores e armazena `idOp` e `name`
        this.operators = response.content.map(op => ({ idOp: op.idOp, name: op.name }));
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

  // Atualiza `selectedOperators` e emite os IDs selecionados
  changeOperators(selectedIds: string[]): void {
    this.selectedOperators = selectedIds;
    this.operatorsChange.emit(selectedIds);  // Emite os IDs dos operadores selecionados
  }

  ngOnDestroy() {
    this.alive = false;
  }
}