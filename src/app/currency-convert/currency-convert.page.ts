import { Component, OnInit } from '@angular/core';
import {
  ItemReorderEventDetail,
  ModalController,
  InputChangeEventDetail,
  InputCustomEvent,
} from '@ionic/angular';
import { currencies } from '../models/currencies';
import { Currency } from '../models/currency';
import { CurrencySelectionModalComponent } from './currency-selection-modal/currency-selection-modal.component';
import { ExchangeRateService } from '../services/exchange-rate.service';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage implements OnInit {
  readonly currenciesList: Currency[];

  constructor(
    private modalCtrl: ModalController,
    private exchgeRateService: ExchangeRateService
  ) {
    this.currenciesList = currencies.map((c) => {
      const currency = new Currency();
      currency.countryCode = c.countryCode;
      currency.countryName = c.countryName;
      currency.currencyCode = c.currencyCode;
      currency.currencyName = c.currencyName;
      currency.currencySymbol = c.currencySymbol;
      return currency;
    });
    this.activeCurrencies = currencies
      .filter((c) => ['USD', 'PEN', 'COP'].includes(c.currencyCode))
      .map((c) => {
        const currency = new Currency();
        currency.countryCode = c.countryCode;
        currency.countryName = c.countryName;
        currency.currencyCode = c.currencyCode;
        currency.currencyName = c.currencyName;
        currency.currencySymbol = c.currencySymbol;
        return currency;
      });
  }

  ngOnInit(): void {
    this.selectedCurrency = this.activeCurrencies[0];
    this.exchgeRateService
      .getRates(this.selectedCurrency.currencyCode)
      .subscribe((res) => {
        this.exchangeRate = res;
        this.refreshCurrencyValues();
      });
  }

  selectedCurrency: any;
  activeCurrencies: Currency[];
  title = 'Convert';
  exchangeRate: any;

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

  currencyValueChanged(event: InputCustomEvent, currency: Currency) {
    const value = +event.detail.value!;
    const newValue = !value ? currency.value : value;
    currency.value = Math.round((newValue! + Number.EPSILON) * 100) / 100;
    this.refreshCurrencyValues();
  }

  getCurrencyInputLabel(currency: Currency) {
    return !!currency.value ? currency.currencySymbol : '';
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
      this.activeCurrencies = this.activeCurrencies.map((c) => {
        if (c.currencyCode === data.currencyToReplace) {
          const clCurrency = this.currenciesList.find(
            (c) => c.currencyCode === data.replacementCurrency
          );
          const newCurrency = new Currency();
          newCurrency.currencyCode = clCurrency!.currencyCode;
          newCurrency.currencyName = clCurrency!.currencyName;
          newCurrency.currencySymbol = clCurrency!.currencySymbol;
          newCurrency.countryCode = clCurrency!.countryCode;
          newCurrency.countryName = clCurrency!.countryName;
          newCurrency.value = c.value;
          this.selectedCurrency = newCurrency;
          return newCurrency;
        } else {
          return c;
        }
      });
      this.exchgeRateService
        .getRates(data.replacementCurrency)
        .subscribe((res) => {
          this.exchangeRate = res;
          this.updateCurrencyValues();
        });
    }

    if (!!data.selectedCurrencies) {
      console.log(data.selectedCurrencies);
      return;
    }
  }

  private refreshCurrencyValues() {
    if (!this.selectedCurrency || !this.selectedCurrency.value) {
      return;
    }

    if (
      !this.exchangeRate ||
      this.exchangeRate.base_code !== this.selectedCurrency.currencyCode
    ) {
      this.exchgeRateService
        .getRates(this.selectedCurrency.currencyCode)
        .subscribe((res) => {
          this.exchangeRate = res;
          this.updateCurrencyValues();
        });
      return;
    }
    this.updateCurrencyValues();
  }

  private updateCurrencyValues() {
    this.activeCurrencies.forEach((c) => {
      c.value =
        this.selectedCurrency.value *
        this.exchangeRate.conversion_rates[c.currencyCode];
    });
  }
}
