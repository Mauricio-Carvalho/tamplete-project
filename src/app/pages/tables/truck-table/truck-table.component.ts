import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { TruckTableData } from '../../../@core/data/truck-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-truck-table',
  templateUrl: './truck-table.component.html',
  styleUrls: ['./truck-table.component.scss'],
})
export class TruckTableComponent implements OnDestroy {

  settings = {
    actions: {
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
  };

  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService,
              private service: TruckTableData,
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
        const newTruckData = event.newData;
        this.service.createData(newTruckData).subscribe(
          response => {
            console.info('Create: ', newTruckData);
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
        const updatedTruckData = event.newData;
        this.service.updateData(event.data.idTruck, updatedTruckData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idTruck, ' - Data: ', updatedTruckData);
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
        this.service.deleteData(event.data.idTruck).subscribe(
          () => {
            console.info('Delete ID: ', event.data.idTruck);
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
      idTruck: {
        title: this.translate.instant('truck.table.idTruck'),
        type: 'number',
      },
      model: {
        title: this.translate.instant('truck.table.model'),
        type: 'string',
      },
      comb: {
        title: this.translate.instant('truck.table.comb'),
        type: 'number',
      },
      qtdCombS10: {
        title: this.translate.instant('truck.table.qtdCombS10'),
        type: 'number',
      },
      nfCombS10: {
        title: this.translate.instant('truck.table.nfCombS10'),
        type: 'string',
      },
      qtdCombS500: {
        title: this.translate.instant('truck.table.qtdCombS500'),
        type: 'number',
      },
      nfCombS500: {
        title: this.translate.instant('truck.table.nfCombS500'),
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
