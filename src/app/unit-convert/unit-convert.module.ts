import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitConvertPage } from './unit-convert.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UnitConvertPageRoutingModule } from './unit-convert-routing.module';
import { UnitsComponent } from './units/units.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UnitConvertPageRoutingModule,
  ],
  declarations: [UnitConvertPage, UnitsComponent],
})
export class UnitConvertPageModule {}
