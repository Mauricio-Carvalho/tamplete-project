import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { UserTableData } from '../../../@core/data/user-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnDestroy {

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
              private service: UserTableData,
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
        const newUserData = event.newData;
        this.service.createData(newUserData).subscribe(
          response => {
            console.info('Create: ', newUserData);
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
        const updatedUserData = event.newData;
        this.service.updateData(event.data.idUser, updatedUserData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idUser, ' - Data: ', updatedUserData);
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
        this.service.deleteData(event.data.id).subscribe(
          () => {
            console.info('Delete ID: ', event.data.id);
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

  // Load table settings
  loadTableSettings() {
    this.settings.columns = {
      // idUser: {
      //   title: this.translate.instant('user.table.idUser'),
      //   type: 'number',
      // },
      firstName: {
        title: this.translate.instant('user.table.firstName'),
        type: 'string',
      },
      lastName: {
        title: this.translate.instant('user.table.lastName'),
        type: 'string',
      },
      // dateBirth: {
      //   title: this.translate.instant('user.table.dateBirth'),
      //   type: 'string',
      // },
      // userSex: {
      //   title: this.translate.instant('user.table.userSex'),
      //   type: 'string',
      // },
      // typeDocument: {
      //   title: this.translate.instant('user.table.typeDocument'),
      //   type: 'string',
      // },
      document: {
        title: this.translate.instant('user.table.document'),
        type: 'string',
      },
      // idEnterprise: {
      //   title: this.translate.instant('user.table.idEnterprise'),
      //   type: 'string',
      // },
      enterprise: {
        title: this.translate.instant('user.table.enterprise'),
        type: 'string',
      },
      email: {
        title: this.translate.instant('user.table.email'),
        type: 'string',
      },
      telephone: {
        title: this.translate.instant('user.table.telephone'),
        type: 'string',
      },
      username: {
        title: this.translate.instant('user.table.username'),
        type: 'string',
      },
      // password: {
      //   title: this.translate.instant('user.table.password'),
      //   type: 'string',
      // },
      userType: {
        title: this.translate.instant('user.table.userType'),
        type: 'string',
      },
      userStatus: {
        title: this.translate.instant('user.table.userStatus'),
        type: 'string',
      },
      // userLanguage: {
      //   title: this.translate.instant('user.table.userLanguage'),
      //   type: 'string',
      // },
      // userTheme: {
      //   title: this.translate.instant('user.table.userTheme'),
      //   type: 'string',
      // },
    };
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

}
