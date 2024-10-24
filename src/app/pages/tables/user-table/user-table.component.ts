import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { UserTableData } from '../../../@core/data/user-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {

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

  // Define as listas de tipos de usuários
  private managerMasterList = [
    { value: 'EMPLOYEE', title: this.translate.instant('user.table.userType.employee') },
    { value: 'MANAGER', title: this.translate.instant('user.table.userType.manager') },
    { value: 'MANAGER_MASTER', title: this.translate.instant('user.table.userType.managerMaster') },
  ];

  private managerList = [
    { value: 'EMPLOYEE', title: this.translate.instant('user.table.userType.employee') },
    { value: 'MANAGER', title: this.translate.instant('user.table.userType.manager') },
  ];

  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;
  userType: string;

  constructor(private translate: TranslateService,
              private service: UserTableData,
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
            console.info('Update idUser: ', event.data.idUser, ' - Data: ', updatedUserData);
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
        this.service.deleteData(event.data.idUser).subscribe(
          () => {
            console.info('Delete idUser: ', event.data.idUser);
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
    const isAddRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isEditRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isDeleteRestrictedUser = ['MANAGER_MASTER'].includes(this.userType);
    const isColumnRestrictedUser = ['MANAGER', 'EMPLOYEE'].includes(this.userType); // Quem nao pode ver a coluna
    const isListRestrictedUser = ['MANAGER_MASTER'].includes(this.userType);

    this.settings.actions.add = isAddRestrictedUser;
    this.settings.actions.edit = isEditRestrictedUser;
    this.settings.actions.delete = isDeleteRestrictedUser;

    this.settings.columns = {
      idUser: {
        title: this.translate.instant('user.table.idUser'),
        type: 'number',
        hide: true, // Coluna invisível
      },
      firstName: {
        title: this.translate.instant('user.table.firstName'),
        type: 'string',
      },
      lastName: {
        title: this.translate.instant('user.table.lastName'),
        type: 'string',
      },
      dateBirth: {
        title: this.translate.instant('user.table.dateBirth'),
        type: 'string',
        hide: true, // Coluna invisível
      },
      userSex: {
        title: this.translate.instant('user.table.userSex.gender'),
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'MASCULINE', title: this.translate.instant('user.table.userSex.masculine') },
              { value: 'FEMININE', title: this.translate.instant('user.table.userSex.feminine') },
              { value: 'OTHER', title: this.translate.instant('user.table.userSex.other') },
            ],
          },
        },
        hide: true, // Coluna invisível
      },
      typeDocument: {
        title: this.translate.instant('user.table.typeDocument'),
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'CPF', title: 'CPF' },
              { value: 'CNPJ', title: 'CNPJ' },
            ],
          },
        },
        hide: true, // Coluna invisível
      },
      document: {
        title: this.translate.instant('user.table.document'),
        type: 'string',
      },
      idEnterprise: {
        title: this.translate.instant('user.table.idEnterprise'),
        type: 'string',
        hide: true, // Coluna invisível
      },
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
      //   hide: true, // Coluna invisível
      // },
      userType: {
        title: this.translate.instant('user.table.userType.title'),
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: isListRestrictedUser ? this.managerMasterList : this.managerList,
          },
        },
        hide: false,
      },
      userStatus: {
        title: this.translate.instant('user.table.userStatus.title'),
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'ACTIVE', title: this.translate.instant('user.table.userStatus.active') },
              { value: 'BLOCKED', title: this.translate.instant('user.table.userStatus.blocked') },
            ],
          },
        },
      },
      userLanguage: {
        title: this.translate.instant('user.table.userLanguage'),
        type: 'string',
        hide: true, // Coluna invisível
      },
      userTheme: {
        title: this.translate.instant('user.table.userTheme'),
        type: 'string',
        hide: true, // Coluna invisível
      },
    };
  }


  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

}
