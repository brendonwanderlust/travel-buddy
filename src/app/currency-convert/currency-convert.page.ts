import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage {
  constructor() {}

  title = 'Convert';
  currencies = [
    { name: 'Peru', flag: 'assets/images/flags/pe.svg', currency: 'PEN' },
    {
      name: 'United States',
      flag: 'assets/images/flags/us.svg',
      currency: 'USD',
    },
    // Add more countries as needed
  ];

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.currencies = ev.detail.complete(this.currencies);
    // save countries list to userSettings
  }
}
