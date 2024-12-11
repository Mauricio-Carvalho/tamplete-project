import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import * as Papa from 'papaparse';
import { FuelTableData } from '../../../@core/data/fuel-table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { MachineTableData } from '../../../@core/data/machine-table';
import { DatePickerComponent } from '../../../@core/data/DatePickerComponent';

@Component({
  selector: 'ngx-fuel-table',
  templateUrl: './fuel-table.component.html',
  styleUrls: ['./fuel-table.component.scss'],
})
export class FuelTableComponent implements OnInit, OnDestroy {

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

  machinesTempList: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  private langChangeSub: Subscription;
  userType: string;

  constructor(
    private translate: TranslateService,
    private service: FuelTableData,
    private machineService: MachineTableData,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // this.loadMachines(); // Carrega a lista de máquinas
    this.userType = this.authService.jwtPayload?.userType;
    this.loadTableSettings();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTableSettings();
    });

    this.loadData();
  }

  loadMachines() {
    this.machineService.getData().subscribe(
      (machines: any[]) => {
        // A resposta já é uma lista de máquinas, portanto não precisamos acessar 'content'
        this.machinesTempList = machines;
        // console.info('List Machine: ', this.machinesTempList);
        // this.loadTableSettings(); // Atualiza a configuração da tabela aqui
        // this.source.refresh(); // Atualiza a fonte da tabela após a configuração
      },
      error => {
        console.error('Error loading machines: ', error);
        this.toastrService.danger('Error loading machines');
      },
    );
  }

  loadData() {
    this.service.getData().subscribe(
      (data: any[]) => {
        this.source.load(data);
      },
      error => {
        console.error('Error loading data: ', error);
        this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
      });
  }

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
        const newFuelData = event.newData;
        this.service.createData(newFuelData).subscribe(
          response => {
            console.info('Create: ', newFuelData);
            this.toastrService.success(
              this.translate.instant('toastr.create.success.message'),
              this.translate.instant('toastr.create.success.title'),
            );
            event.confirm.resolve(response);
            this.loadData();
          },
          error => {
            console.error('Error creating record: ', error);
            console.error('Error creating record Usuario: ', error.error[0].mensagemUsuario);

            // Mensagem padrão
            const defaultErrorMessage = this.translate.instant('toastr.create.error.message');
            // Mensagem de erro específica, se disponível
            const specificErrorMessage = error.error[0].mensagemUsuario
              ? `${error.error[0].mensagemUsuario}`
              : defaultErrorMessage;

            this.toastrService.danger(
              specificErrorMessage,
              this.translate.instant('toastr.create.error.title'),
              { duration: 10000 });
              event.confirm.reject();
          })
        ;
      } else {
        event.confirm.reject();
      }
    });
  }

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
        const updatedFuelData = event.newData;
        this.service.updateData(event.data.idFuel, updatedFuelData).subscribe(
          response => {
            console.info('Update ID: ', event.data.idFuel, ' - Data: ', updatedFuelData);
            this.toastrService.success(this.translate.instant('toastr.update.success.message'), this.translate.instant('toastr.update.success.title'));
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
            this.toastrService.danger(specificErrorMessage, this.translate.instant('toastr.update.error.title'), {
              duration: 10000,
            });
          });
      } else {
        event.confirm.reject();
      }
    });
  }

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
        this.service.deleteData(event.data.idFuel).subscribe(
          () => {
            console.info('Delete ID: ', event.data.idFuel);
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
          })
        ;
      } else {
        event.confirm.reject();
      }
    });
  }

  loadTableSettings() {

    console.info('Current Machines List: ', this.machinesTempList);

    const isAddRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isEditRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);
    const isDeleteRestrictedUser = ['MANAGER', 'MANAGER_MASTER'].includes(this.userType);

    this.settings.actions.add = isAddRestrictedUser;
    this.settings.actions.edit = isEditRestrictedUser;
    this.settings.actions.delete = isDeleteRestrictedUser;

    this.settings.columns = {
      idFuel: {
        title: this.translate.instant('fuel.table.idFuel'),
        type: 'string',
        editable: false,
      },
      idOp: {
        title: this.translate.instant('fuel.table.idOp'),
        type: 'string',
        hide: false,
      },
      nameOp: {
        title: this.translate.instant('fuel.table.nameOp'),
        type: 'string',
        editable: false,
      },
      nameMac: {
        title: this.translate.instant('fuel.table.nameMac'),
        type: 'string',
      },
      // nameMac: {
      //   title: this.translate.instant('fuel.table.nameMac'),
      //     filter: {
      //       type: 'list',
      //       config: {
      //         selectText: 'Select...',
      //         list: [
      //           { value: 'Glenna Reichert', title: 'Glenna Reichert' },
      //           { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
      //           { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
      //         ],
      //       },
      //     },
      // },
      subMac: {
        title: this.translate.instant('fuel.table.subMac'),
        type: 'string',
        // editor: {
        //   type: 'list',
        //   config: {
        //     list: this.getMachinesList(), // Atualiza a lista aqui
        //   },
        // },
        hide: false,
        editable: false,
      },
      idTruck: {
        title: this.translate.instant('fuel.table.idTruck'),
        type: 'string',
      },
      hrMeter: {
        title: this.translate.instant('fuel.table.hrMeter'),
        type: 'number',
      },
      comb: {
        title: this.translate.instant('fuel.table.comb'),
        type: 'string',
        // filter: {
        //   type: 'completer',
        //   config: {
        //     completer: {
        //       data: this.machinesTempList,
        //       searchFields: 'name',
        //     },
        //   },
        // },
        //{"content":[{"name":"REG 6214","tagMac":null,"status":"BLOCKED","comb":"S500","subMac":"V89","dateCreated":"2024-10-14T13:13:06","dateUpdated":"2024-10-24T01:15:46"},{"name":"REG 6215","tagMac":"REG 6215","status":"ACTIVE","comb":"S500","subMac":"SUB324","dateCreated":"2024-10-14T18:34:28","dateUpdated":"2024-10-23T01:37:03"},{"name":"REG 6216","tagMac":"REG 6216","status":"ACTIVE","comb":"S10","subMac":"V88","dateCreated":"2024-10-24T01:15:19","dateUpdated":"2024-10-24T01:15:19"},{"name":"TESTE","tagMac":"F3B930F8","status":"BLOCKED","comb":"S500","subMac":"TESTESUB","dateCreated":"2024-10-23T22:02:14","dateUpdated":"2024-10-23T22:02:14"}],"pageable":{"sort":{"empty":false,"sorted":true,"unsorted":false},"offset":0,"pageNumber":0,"pageSize":1000,"paged":true,"unpaged":false},"last":true,"totalElements":4,"totalPages":1,"number":0,"size":1000,"first":true,"sort":{"empty":false,"sorted":true,"unsorted":false},"numberOfElements":4,"empty":false}
        filter: {
          type: 'list',
          config: {
            selectText: this.translate.instant('fuel.table.comb'),
            list: [
              { value: 'S10', title: 'S10' },
              { value: 'S500', title: 'S500' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'S10', title: 'S10' },
              { value: 'S500', title: 'S500' },
            ],
          },
        },
      },
      qtdComb: {
        title: this.translate.instant('fuel.table.qtdComb'),
        type: 'number',
      },
      pullOver: {
        title: this.translate.instant('fuel.table.pullOver'),
        type: 'string',
      },
      start: {
        title: this.translate.instant('fuel.table.start'),
        type: 'string',
      },
      end: {
        title: this.translate.instant('fuel.table.end'),
        type: 'string',
      },
      timeFuel: {
        title: this.translate.instant('fuel.table.timeFuel'),
        type: 'number',
      },
      nf: {
        title: this.translate.instant('fuel.table.nf'),
        type: 'string',
        editable: false,
      },
      city: {
        title: this.translate.instant('fuel.table.city'),
        type: 'string',
      },
    };
  }

  getMachinesList() {
    return this.machinesTempList.map(machine => ({
      value: machine.idSubMac,
      title: machine.idSubMac,
    }));
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  downloadCSV() {
    this.service.getData().subscribe(data => {
      const filteredData = data.map(item => ({
        idFuel: item.idFuel,
        idOp: item.idOp,
        nameOp: item.nameOp,
        nameMac: item.nameMac,
        subMac: item.subMac,
        idTruck: item.idTruck,
        comb: item.comb,
        qtdComb: item.qtdComb,
        hrMeter: item.hrMeter,
        // pullOver: item.pullOver,
        start: item.start,
        end: item.end,
        timeFuel: item.timeFuel,
        nf: item.nf,
        city: item.city,
      }));

      const csv = Papa.unparse(filteredData, { delimiter: ';' });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      const now = new Date();
      const dateString = now.toISOString().slice(0, 10);
      const timeString = now.toTimeString().slice(0, 8).replace(/:/g, '-');
      const filename = `fuel_${dateString}_${timeString}.csv`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error => {
      console.error('Error fetching data for CSV download: ', error);
      this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
    });
  }

}
