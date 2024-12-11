
import {Component, OnDestroy} from '@angular/core';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs';


@Component({
  selector: 'ngx-administrative',
  styleUrls: ['./administrative.component.scss'],
  templateUrl: './administrative.component.html',
})
export class AdministrativeComponent {
  constructor(
              private toastrService: NbToastrService,
              private translate: TranslateService) {}

}
