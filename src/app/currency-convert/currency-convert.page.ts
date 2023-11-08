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
  countries = [
    { name: 'Peru', flag: 'pe.svg', currency: 'PEN' },
    { name: 'United States', flag: 'us.svg', currency: 'USD' },
    // Add more countries as needed
  ];

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.countries = ev.detail.complete(this.countries);
    // save countries list to userSettings
  }
}
