import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MachineTableData } from '../../../@core/data/machine-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './machine-table.component.html',
  styleUrls: ['./machine-table.component.scss'],
})
export class MachineTableComponent implements OnDestroy {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
              private service: MachineTableData) {
    this.loadTableSettings();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTableSettings();
    });

    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadTableSettings() {
    this.settings.columns = {
      idMac: {
        title: this.translate.instant('machine.table.idMac'),
        type: 'string',
      },
      name: {
        title: this.translate.instant('machine.table.name'),
        type: 'string',
      },
      status: {
        title: this.translate.instant('machine.table.status'),
        type: 'string',
      },
    };
  }


  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('machine.confirm_delete'))) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
