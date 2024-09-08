import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { FuelTableData } from '../../../@core/data/fuel-table';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './fuel-table.component.html',
  styleUrls: ['./fuel-table.component.scss'],
})
export class FuelTableComponent implements OnDestroy {

  settings = {
    actions: {
      columnTitle: 'Ações',
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {},
  };

  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService,
              private service: FuelTableData,
              private toastrService: NbToastrService) {
    this.loadTableSettings();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTableSettings();
    });

    this.loadData();
  }

  // Carrega os dados da tabela
  loadData() {
    this.service.getData().subscribe(
      (data: any[]) => this.source.load(data),
      error => {
        console.error('Erro ao carregar dados: ', error);
        this.toastrService.danger('Erro ao carregar dados!', 'Erro');
      })
    ;
  }

  // Confirma a criação de um novo registro
  onCreateConfirm(event): void {
    const newFuelData = event.newData;
    this.service.createData(newFuelData).subscribe(
      response => {
        console.info('Create: ', newFuelData);
        this.toastrService.success('Registro criado com sucesso!', 'Sucesso');
        event.confirm.resolve(response);
        this.loadData();
      },
      error => {
        console.error('Erro ao criar registro: ', error);
        this.toastrService.danger('Erro ao criar registro!', 'Erro');
        event.confirm.reject();
      })
    ;
  }


  // Confirma a edição de um registro
  onEditConfirm(event): void {
    const updatedFuelData = event.newData;
    this.service.updateData(event.data.idFuel, updatedFuelData).subscribe(
      response => {
        console.info('Update ID: ', event.data.idFuel, ' - Data: ', updatedFuelData);
        this.toastrService.success('Registro editado com sucesso!', 'Sucesso');
        event.confirm.resolve(response);
        this.loadData();
      },
      error => {
        console.error('Erro ao editar registro: ', error);
        this.toastrService.danger('Erro ao editar registro!', 'Erro');
        event.confirm.reject();
      })
    ;
  }


  // Confirma a exclusão de um registro
  onDeleteConfirm(event): void {
    this.service.deleteData(event.data.idFuel).subscribe(
      () => {
        console.info('Delete ID: ', event.data.idFuel);
        this.toastrService.success('Registro deletado com sucesso!', 'Sucesso');
        event.confirm.resolve();
        this.loadData();
      },
      error => {
        console.error('Erro ao deletar registro: ', error);
        this.toastrService.danger('Erro ao deletar registro!', 'Erro');
        event.confirm.reject();
      })
    ;
  }


  loadTableSettings() {
    this.settings.columns = {
      idFuel: {
        title: this.translate.instant('fuel.table.idFuel'),
        type: 'string',
      },
      idMac: {
        title: this.translate.instant('fuel.table.idMac'),
        type: 'string',
      },
      idOp: {
        title: this.translate.instant('fuel.table.idOp'),
        type: 'string',
      },
      comb: {
        title: this.translate.instant('fuel.table.comb'),
        type: 'string',
      },
      qtdComb: {
        title: this.translate.instant('fuel.table.qtdComb'),
        type: 'number',
      },
      tmp: {
        title: this.translate.instant('fuel.table.tmp'),
        type: 'number',
      },
      date: {
        title: this.translate.instant('fuel.table.date'),
        type: 'string',
      },
      idTruck: {
        title: this.translate.instant('fuel.table.idTruck'),
        type: 'string',
      },
    };
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

}
