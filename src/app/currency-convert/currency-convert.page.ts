import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { currencies } from '../models/currencies';
import { Currency } from '../models/currency';
import { CurrencySelectionModalComponent } from './currency-selection-modal/currency-selection-modal.component';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage implements OnInit {
  readonly currenciesList: Currency[];

  constructor(private modalCtrl: ModalController) {
    this.currenciesList = currencies.map((c) => {
      const currency = new Currency();
      currency.countryCode = c.countryCode;
      currency.countryName = c.countryName;
      currency.currencyCode = c.currencyCode;
      currency.currencyName = c.currencyName;
      currency.currencySymbol = c.currencySymbol;
      return currency;
    });
    this.activeCurrencies = currencies.slice(0, 5).map((c) => {
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
  activeCurrencies: Currency[];
  title = 'Convert';

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.activeCurrencies = ev.detail.complete(this.activeCurrencies);
    // save countries list to userSettings
  }

  onCurrencyItemClicked(currency: any) {
    this.selectedCurrency = currency;
  }

  getColor(currency: any): string {
    return this.selectedCurrency === currency ? 'medium' : '';
  }

  currencyValueChanged(event: Event) {
    console.log(event);
  }

  async changeCurrency(currencyCode: string) {
    const modal = await this.modalCtrl.create({
      component: CurrencySelectionModalComponent,
      componentProps: {
        currencyToReplace: currencyCode,
        activeCurrencies: this.activeCurrencies.map((c) => c.currencyCode),
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      return;
    }

    if (!!data.replacementCurrency) {
      let currency = this.activeCurrencies.find(
        (c) => c.currencyCode === data.replacementCurrency
      )!;
      console.log(this.activeCurrencies);
      var index = this.activeCurrencies.indexOf(currency);
      console.log(index);
      console.log(index);
      if (index !== -1) {
        const clCurrency = this.currenciesList.find(
          (c) => c.countryCode === data.replacementCurrency
        );
        const newCurrency = new Currency();
        newCurrency.currencyCode = clCurrency!.currencyCode;
        newCurrency.currencyName = clCurrency!.currencyName;
        newCurrency.currencySymbol = clCurrency!.currencySymbol;
        newCurrency.countryCode = clCurrency!.countryCode;
        newCurrency.countryName = clCurrency!.countryName;
        this.activeCurrencies[index] = newCurrency;
      }
      return;
    }

    if (!!data.selectedCurrencies) {
      console.log(data.selectedCurrencies);
      return;
    }
  }
}
