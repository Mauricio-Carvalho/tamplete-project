import { Component, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OperatorTableData } from '../../../@core/data/operator-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.scss'],
})
export class OperatorTableComponent implements OnDestroy {

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
              private service: OperatorTableData) {
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


  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('user.confirm_delete'))) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
