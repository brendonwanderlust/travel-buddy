import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'currency-convert',
        loadChildren: () =>
          import('../currency-convert/currency-convert.module').then(
            (m) => m.CurrencyConvertPageModule
          ),
      },
      {
        path: 'unit-convert',
        loadChildren: () =>
          import('../unit-convert/unit-convert.module').then(
            (m) => m.UnitConvertPageModule
          ),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/currency-convert',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/currency-convert',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
