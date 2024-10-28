import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
    imports: [
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        TablesRoutingModule,
        Ng2SmartTableModule,
        TranslateModule,
        NbButtonModule,
    ],
  declarations: [
    ...routedComponents,
  ],
})
export class TablesModule { }
