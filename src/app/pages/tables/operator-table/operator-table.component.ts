import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { OperatorTableData } from '../../../@core/data/operator-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.scss'],
})
export class OperatorTableComponent implements OnDestroy {

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
              private service: OperatorTableData,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService) {
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
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: 'Confirmação de Criação',
        message: 'Tem certeza que deseja criar este registro?',
        confirmButtonText: 'Criar',
        cancelButtonText: 'Cancelar',
      },
    }).onClose.subscribe(result => {
      if (result) {
        const newOperatorData = event.newData;
        this.service.createData(newOperatorData).subscribe(
          response => {
            console.info('Create: ', newOperatorData);
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
      } else {
        event.confirm.reject();
      }
    });
  }

  // Confirma a edição de um registro
  onEditConfirm(event): void {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: 'Confirmação de Edição',
        message: 'Tem certeza que deseja editar este registro?',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
      },
    }).onClose.subscribe(result => {
      if (result) {
        const updatedOperatorData = event.newData;
        this.service.updateData(event.data.idOp, updatedOperatorData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idOp, ' - Data: ', updatedOperatorData);
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
      } else {
        event.confirm.reject();
      }
    });
  }

  // Confirma a exclusão de um registro
  onDeleteConfirm(event): void {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: 'Confirmação de Exclusão',
        message: 'Tem certeza que deseja excluir este registro?',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
      },
    }).onClose.subscribe(result => {
      if (result) {
        this.service.deleteData(event.data.idOp).subscribe(
          () => {
            console.info('Delete ID: ', event.data.idOp);
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
      } else {
        event.confirm.reject();
      }
    });
  }

  loadTableSettings() {
    this.settings.columns = {
      idOp: {
        title: this.translate.instant('operator.table.idOp'),
        type: 'string',
      },
      name: {
        title: this.translate.instant('operator.table.name'),
        type: 'string',
      },
      status: {
        title: this.translate.instant('operator.table.status'),
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
