import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbToastrService,
} from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

import { UserTableData } from '../../@core/data/user-table';
import { LayoutService } from '../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent  implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  userData: any;

  permission = [
    { value: 'MANAGER_MASTER' },
    { value: 'MANAGER' },
    { value: 'EMPLOYEE' },
  ];

  listStatus = [
    { value: 'ACTIVE' },
    { value: 'BLOCKED' },
  ];

  languages = [
    {
      value: 'ENGLISH',
      name: 'english',
    },
    {
      value: 'SPANISH',
      name: 'spanish',
    },
    {
      value: 'PORTUGUESE',
      name: 'portuguese',
    },
  ];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  currentTheme = 'dark';

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private service: UserTableData,
              private toastrService: NbToastrService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {

    this.loadData();

    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  // Load table data
  loadData() {
    this.service.getData().subscribe(
      (data: any[]) => {
        this.source.load(data);
        if (data.length > 0) {
          this.userData = data[0];
          this.changeLanguage(this.userData.userLanguage);
          this.userData.userTheme = this.userData.userTheme.toLowerCase();
          this.changeTheme(this.userData.userTheme.toLowerCase());
        }
      },
      error => {
        console.error('Error loading data: ', error);
        this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
      })
    ;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeLanguage(languageName: string) {
    if (!languageName) {
      languageName = this.userData.userLanguage;
    }
    this.translate.use(languageName);
    localStorage.setItem('currentLanguage', languageName);
  }

  changeTheme(themeName: string) {
    if (!themeName) {
      themeName = this.currentTheme;
    }
    this.currentTheme = 'default';
    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    localStorage.setItem('currentTheme', themeName);
  }

}
