import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { OperatorTableData } from '../../../@core/data/operator-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-operator-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.scss'],
})
export class OperatorTableComponent implements OnDestroy {

  settings = {
    actions: {
      columnTitle: this.translate.instant('actions'),
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
        const newOperatorData = event.newData;
        this.service.createData(newOperatorData).subscribe(
          response => {
            console.info('Create: ', newOperatorData);
            this.toastrService.success(this.translate.instant('toastr.create.success.message'), this.translate.instant('toastr.create.success.title'));
            event.confirm.resolve(response);
            this.loadData();
          },
          error => {
            console.error('Error creating record: ', error);
            this.toastrService.danger(this.translate.instant('toastr.create.error.message'), this.translate.instant('toastr.create.error.title'));
            event.confirm.reject();
          })
        ;
      } else {
        event.confirm.reject();
      }
    });
  }

  // Confirm editing of a record
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
        const updatedOperatorData = event.newData;
        this.service.updateData(event.data.idOp, updatedOperatorData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idOp, ' - Data: ', updatedOperatorData);
            this.toastrService.success(this.translate.instant('toastr.update.success.message'), this.translate.instant('toastr.update.success.title'));
            event.confirm.resolve(response);
            this.loadData();
          },
          error => {
            console.error('Error editing record: ', error);
            this.toastrService.danger(this.translate.instant('toastr.update.error.message'), this.translate.instant('toastr.update.error.title'));
            event.confirm.reject();
          })
        ;
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
        this.service.deleteData(event.data.idOp).subscribe(
          () => {
            console.info('Delete ID: ', event.data.idOp);
            this.toastrService.success(this.translate.instant('toastr.delete.success.message'), this.translate.instant('toastr.delete.success.title'));
            event.confirm.resolve();
            this.loadData();
          },
          error => {
            console.error('Error deleting record: ', error);
            this.toastrService.danger(this.translate.instant('toastr.delete.error.message'), this.translate.instant('toastr.delete.error.title'));
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
      cnh: {
        title: this.translate.instant('operator.table.cnh'),
        type: 'string',
      },
      issueDate: {
        title: this.translate.instant('operator.table.issueDate'),
        type: 'string',
      },
      expirationDate: {
        title: this.translate.instant('operator.table.expirationDate'),
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
