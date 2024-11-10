import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ProfileModule } from './profile/profile.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AdministrativeModule } from './dashboard/administrative.module';
import { DatePickerComponent } from '../@core/data/DatePickerComponent';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    ProfileModule,

    AdministrativeModule,
    FormsModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [
    PagesComponent,
    ConfirmDialogComponent,
    DatePickerComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class PagesModule {
}
