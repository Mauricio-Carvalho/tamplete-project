import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ProfileModule } from './profile/profile.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    ProfileModule,
  ],
  declarations: [
    PagesComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class PagesModule {
}
