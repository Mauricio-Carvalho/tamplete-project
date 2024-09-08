import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() confirmButtonText: string = 'Confirmar';
  @Input() cancelButtonText: string = 'Cancelar';

  constructor(protected ref: NbDialogRef<ConfirmDialogComponent>) {}

  confirm() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }

}
