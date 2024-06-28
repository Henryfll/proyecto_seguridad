import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  
  // Apps & Pages
  {
    id: 'apps',
    type: 'section',
    title: 'MENU',
    translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'MENU.APPS.EMAIL',
        type: 'item',
        icon: 'bar-chart-2',
        url: 'dashboard/analytics'
      },
      
    ]
  },

];
