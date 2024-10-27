import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import * as Papa from 'papaparse';
import { RefuelTableData } from '../../../@core/data/refuel-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-refuel-table',
  templateUrl: './refuel-table.component.html',
  styleUrls: ['./refuel-table.component.scss'],
})
export class RefuelTableComponent implements OnInit, OnDestroy {

  settings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
      columnTitle: this.translate.instant('action'),
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
    pager: {
      display: true,
      perPage: 10,
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;
  userType: string;

  constructor(private translate: TranslateService,
              private service: RefuelTableData,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService,
              private authService: AuthService) {}

  ngOnInit() {
    this.userType = this.authService.jwtPayload?.userType;
    this.loadTableSettings();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTableSettings();
    });

    this.loadData();
  }

  // Load table data
  loadData() {
    this.service.getData().subscribe(
      (data: any[]) => this.source.load(data),
      error => {
        console.error('Error loading data: ', error);
        this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
      })
    ;
  }

  // Confirm creation of a new record
  onCreateConfirm(event): void {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('dialog.create.title'),
        message: this.translate.instant('dialog.create.message'),
        confirmButtonText: this.translate.instant('dialog.create.confirmButtonText'),
        cancelButtonText: this.translate.instant('dialog.create.cancelButtonText'),
      },
    }).onClose.subscribe(result => {
      if (result) {
        const newRefuelData = event.newData;

        this.service.createData(newRefuelData).subscribe(
          response => {
            console.info('Create: ', newRefuelData);
            this.toastrService.success(
              this.translate.instant('toastr.create.success.message'),
              this.translate.instant('toastr.create.success.title'),
            );
            event.confirm.resolve(response);
            this.loadData();
          },
          error => {
            console.error('Error creating record: ', error);

            // Mensagem padrão
            const defaultErrorMessage = this.translate.instant('toastr.create.error.message');
            // Mensagem de erro específica, se disponível
            const specificErrorMessage = error.error[0].mensagemUsuario
              ? `${error.error[0].mensagemUsuario}`
              : defaultErrorMessage;

            this.toastrService.danger(
              specificErrorMessage,
              this.translate.instant('toastr.create.error.title'),
              { duration: 10000 },
            );
            event.confirm.reject();
          },
        );
      } else {
        event.confirm.reject();
      }
    });
  }

  // Confirm edit of a record
  onEditConfirm(event): void {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('dialog.update.title'),
        message: this.translate.instant('dialog.update.message'),
        confirmButtonText: this.translate.instant('dialog.update.confirmButtonText'),
        cancelButtonText: this.translate.instant('dialog.update.cancelButtonText'),
      },
    }).onClose.subscribe(result => {
      if (result) {
        const updatedRefuelData = event.newData;

        this.service.updateData(event.data.idRefuel, updatedRefuelData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idRefuel, ' - Data: ', updatedRefuelData);
            this.toastrService.success(
              this.translate.instant('toastr.update.success.message'),
              this.translate.instant('toastr.update.success.title'),
            );
            event.confirm.resolve(response);
            this.loadData();
          },
          error => {
            console.error('Error editing record: ', error);

            // Mensagem padrão
            const defaultErrorMessage = this.translate.instant('toastr.update.error.message');
            // Mensagem de erro específica, se disponível
            const specificErrorMessage = error.error[0].mensagemUsuario
              ? `${error.error[0].mensagemUsuario}`
              : defaultErrorMessage;

            this.toastrService.danger(
              specificErrorMessage,
              this.translate.instant('toastr.update.error.title'),
              { duration: 10000 },
            );
            event.confirm.reject();
          },
        );
      } else {
        event.confirm.reject();
      }
    });
  }

  // Confirm deletion of a record
  onDeleteConfirm(event): void {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('dialog.delete.title'),
        message: this.translate.instant('dialog.delete.message'),
        confirmButtonText: this.translate.instant('dialog.delete.confirmButtonText'),
        cancelButtonText: this.translate.instant('dialog.delete.cancelButtonText'),
      },
    }).onClose.subscribe(result => {
      if (result) {
        this.service.deleteData(event.data.idRefuel).subscribe(
          () => {
            console.info('Delete ID: ', event.data.idRefuel);
            this.toastrService.success(
              this.translate.instant('toastr.delete.success.message'),
              this.translate.instant('toastr.delete.success.title'),
            );
            event.confirm.resolve();
            this.loadData();
          },
          error => {
            console.error('Error deleting record: ', error);

            // Mensagem padrão
            const defaultErrorMessage = this.translate.instant('toastr.delete.error.message');
            // Mensagem de erro específica, se disponível
            const specificErrorMessage = error.error[0].mensagemUsuario
              ? `${error.error[0].mensagemUsuario}`
              : defaultErrorMessage;

            this.toastrService.danger(
              specificErrorMessage,
              this.translate.instant('toastr.delete.error.title'),
              { duration: 10000 },
            );
            event.confirm.reject();
          },
        );
      } else {
        event.confirm.reject();
      }
    });
  }

  loadTableSettings() {
    const isAddRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isEditRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isDeleteRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);

    this.settings.actions.add = isAddRestrictedUser;
    this.settings.actions.edit = isEditRestrictedUser;
    this.settings.actions.delete = isDeleteRestrictedUser;

    this.settings.columns = {
      idRefuel: {
        title: this.translate.instant('refuel.table.idRefuel'),
        type: 'string',
      },
      idTruck: {
        title: this.translate.instant('refuel.table.idTruck'),
        type: 'string',
      },
      idOp: {
        title: this.translate.instant('refuel.table.idOp'),
        type: 'string',
      },
      // comb: {
      //   title: this.translate.instant('refuel.table.comb'),
      //   type: 'string',
      // },
      qtdCombS10: {
        title: this.translate.instant('refuel.table.qtdCombS10'),
        type: 'number',
      },
      qtdCombS500: {
        title: this.translate.instant('refuel.table.qtdCombS500'),
        type: 'number',
      },
      date: {
        title: this.translate.instant('refuel.table.date'),
        type: 'string',
      },
      hour: {
        title: this.translate.instant('refuel.table.hour'),
        type: 'string',
      },
      nf: {
        title: this.translate.instant('refuel.table.nf'),
        type: 'string',
      },
    };
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  downloadCSV() {
    const csv = Papa.unparse(this.source, {
      delimiter: ';',
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const dateString = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timeString = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
    const filename = `refuel_${dateString}_${timeString}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
