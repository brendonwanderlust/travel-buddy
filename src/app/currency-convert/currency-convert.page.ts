import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, IonSelect } from '@ionic/angular';
import { currencies } from '../models/currencies';
import { Currency } from '../models/currency';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage implements OnInit {
  constructor() {
    this.currencies = currencies.map((c) => {
      const currency = new Currency();
      currency.countryCode = c.countryCode;
      currency.countryName = c.countryName;
      currency.currencyCode = c.currencyCode;
      currency.currencyName = c.currencyName;
      currency.currencySymbol = c.currencySymbol;
      return currency;
    });
  }

  ngOnInit(): void {}

  selectedCurrency: any;
  title = 'Convert';
  currencies: Currency[];
  //  = [
  //   { name: 'Peru', flag: 'assets/images/flags/pe.svg', currency: 'PEN' },
  //   {
  //     name: 'United States',
  //     flag: 'assets/images/flags/us.svg',
  //     currency: 'USD',
  //   },
  //   // Add more countries as needed
  // ];

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.currencies = ev.detail.complete(this.currencies);
    // save countries list to userSettings
  }

  onCurrencyClicked(currency: any) {
    this.selectedCurrency = currency;
  }

  getColor(currency: any): string {
    return this.selectedCurrency === currency ? 'medium' : '';
  }

  currencyValueChanged(event: Event) {
    console.log(event);
  }
}
