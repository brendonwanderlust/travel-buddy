import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitConvertPage } from './unit-convert.page';

const routes: Routes = [
  {
    path: '',
    component: UnitConvertPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitConvertPageRoutingModule {}
