import { Component, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { getMenuItems } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  private langChangeSub: Subscription;

  constructor(private translate: TranslateService,
              private authService: AuthService
  ) {
    this.menu = getMenuItems(this.translate);
    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.menu = getMenuItems(this.translate);
    const userType = this.authService.getUserType();
    this.menu = this.filterMenuItemsByUserType(this.menu, userType);
    });
  }

  ngOnDestroy() {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  filterMenuItemsByUserType(menuItems: NbMenuItem[], userType: string): NbMenuItem[] {
    return menuItems.filter(item => {
      if (item.children) {
        item.children = this.filterMenuItemsByUserType(item.children, userType);
      }
      return this.isMenuItemVisible(item, userType);
    });
  }

  isMenuItemVisible(item: NbMenuItem, userType: string): boolean {
    if (!item.data || !item.data.requiredUserType) {
      return true; // Se não houver um tipo de usuário específico requerido, o item é visível para todos
    }
    return item.data.requiredUserType.includes(userType);
  }
}
