import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

export function getMenuItems(translate: TranslateService): NbMenuItem[] {
  return [
    {
      title: translate.instant('menu.title'),
      group: true,
    },

    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/pages/dashboard',
      data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE']}
    },
    {
      title: translate.instant('menu.list.tables.title'),
      icon: 'grid-outline',
      children: [
        {
          title: translate.instant('menu.list.tables.user'),
          link: '/pages/tables/user-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER'] },
        },
        {
          title: translate.instant('menu.list.tables.fuel'),
          link: '/pages/tables/fuel-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE'] },
        },
        {
          title: translate.instant('menu.list.tables.refuel'),
          link: '/pages/tables/refuel-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE'] },
        },
        {
          title: translate.instant('menu.list.tables.machine'),
          link: '/pages/tables/machine-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE'] },
        },
        {
          title: translate.instant('menu.list.tables.operator'),
          link: '/pages/tables/operator-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE'] },
        },
        {
          title: translate.instant('menu.list.tables.truck'),
          link: '/pages/tables/truck-table',
          data: { requiredUserType: ['MANAGER_MASTER', 'MANAGER', 'EMPLOYEE'] },
        },
      ],
    },
    {
      title: translate.instant('menu.list.auth.title'),
      icon: 'lock-outline',
      children: [
        {
          title: translate.instant('menu.list.auth.login'),
          link: '/auth/login',
        },
        {
          title: translate.instant('menu.list.auth.register'),
          link: '/auth/register',
        },
        {
          title: translate.instant('menu.list.auth.request-password'),
          link: '/auth/request-password',
        },
        {
          title: translate.instant('menu.list.auth.reset-password'),
          link: '/auth/reset-password',
        },
      ],
      data: { requiredUserType: ['MANAGER_MASTER'] },
    },

  ];
}
