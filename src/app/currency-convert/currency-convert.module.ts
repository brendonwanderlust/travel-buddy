import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyConvertPage } from './currency-convert.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CurrencyConvertRoutingModule } from './currency-convert-routing.module';
import { CurrencySelectionModalComponent } from './currency-selection-modal/currency-selection-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CurrencyConvertRoutingModule,
  ],
  declarations: [CurrencyConvertPage, CurrencySelectionModalComponent],
})
export class CurrencyConvertPageModule {}
