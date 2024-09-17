import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { AuthorizedComponent } from './authorized/authorized.component';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StartHttpInterceptor } from './start-http-interceptor';
import { environment } from '../../../environments/environment';


export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }       
    }),
  ],
  declarations: [
    AuthorizedComponent
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StartHttpInterceptor,
      multi: true
    }
  ],

})
export class NgxAuthModule {
}
