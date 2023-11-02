import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConvertPage as CurrencyConvert } from './currency-convert.page';

const routes: Routes = [
  {
    path: '',
    component: CurrencyConvert,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyConvertRoutingModule {}
