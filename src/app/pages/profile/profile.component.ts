import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbToastrService,
  NbUserModule,
} from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

import { UserTableData } from '../../@core/data/user-table';
import { LayoutService } from '../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../auth/auth.service';

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
    {value: 'MANAGER_MASTER'},
    {value: 'MANAGER'},
    {value: 'EMPLOYEE'},
  ];

  listStatus = [
    {value: 'ACTIVE'},
    {value: 'BLOCKED'},
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
    /*{
      value: 'corporate',
      name: 'Corporate',
    }, */
  ];

  currentTheme = 'default';
  source: LocalDataSource = new LocalDataSource();
  userType: string;
  userId: string;

  constructor(private translate: TranslateService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserTableData,
              private toastrService: NbToastrService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.userId = this.authService.jwtPayload?.userId;
    this.userType = this.authService.jwtPayload?.userType;
    this.loadUserData(this.userId);

    this.currentTheme = this.themeService.currentTheme;
    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }

  // Load user data
  loadUserData(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        this.userData = data;
        this.changeLanguage(this.userData.userLanguage);
        this.userData.userTheme = this.userData.userTheme.toLowerCase();
        this.changeTheme(this.userData.userTheme);
      },
      error => {
        console.error('Error loading user data: ', error);
        this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
      },
    );
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

    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    localStorage.setItem('currentTheme', themeName);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        //const imageData = e.target.result; // Obtém a imagem em base64

        // Chame o método para fazer o upload da imagem

        this.uploadUserImage(this.userId, file);
      };
      reader.readAsDataURL(file); // Lê a imagem como uma URL de dados
    }
  }

  uploadUserImage(userId: string, file: File) {
    const formData = new FormData();
          formData.append('file', file); // O nome 'file' deve corresponder ao @RequestParam("file") no Java

    this.userService.uploadImageForm(userId, formData).subscribe(
      response => {
        console.info('Image uploaded successfully', response);
        this.toastrService.success(this.translate.instant('toastr.upload.success.message'), this.translate.instant('toastr.upload.success.title'));
        this.loadUserData(userId);
      },
      error => {
        console.error('Error uploading image: ', error);
        this.toastrService.danger(this.translate.instant('toastr.upload.error.message'), this.translate.instant('toastr.upload.error.title'));
      }
    );
  }


// Método para converter base64 em Blob
  private base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }

  onSubmit(){
    this.userData.userTheme = this.userData.userTheme.toUpperCase();

    this.userService.updateData(this.userId, this.userData).subscribe(
      (data: any) => {
        this.toastrService.success(this.translate.instant('toastr.update.success.message'), this.translate.instant('toastr.update.success.title'));
      },
      error => {
        console.error('Error loading user data: ', error);
        this.toastrService.danger(this.translate.instant('toastr.load.error.message'), this.translate.instant('toastr.load.error.title'));
      },
    );

  }
}
