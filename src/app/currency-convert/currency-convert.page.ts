import { Component, OnInit } from '@angular/core';
import {
  ItemReorderEventDetail,
  ModalController,
  InputCustomEvent,
  ToastController,
} from '@ionic/angular';
import { currencies } from '../models/currencies';
import { Currency } from '../models/currency';
import { CurrencySelectionModalComponent } from './currency-selection-modal/currency-selection-modal.component';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { CachingService } from '../services/caching.service';
import { round } from 'src/utils/utils';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage implements OnInit {
  private readonly defaultCodes: string[] = ['USD', 'EUR'];
  private readonly cacheKey: string = 'CACHED_CURRENCIES';

  constructor(
    private modalCtrl: ModalController,
    private exchgeRateService: ExchangeRateService,
    private cacheService: CachingService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const cachedCurrencies = await this.cacheService.getCachedRequest(
      this.cacheKey
    );
    if (cachedCurrencies) {
      this.activeCurrencies = cachedCurrencies.map((c: any) => {
        const currency = new Currency();
        currency.countryCode = c.countryCode;
        currency.countryName = c.countryName;
        currency.currencyCode = c.currencyCode;
        currency.currencyName = c.currencyName;
        currency.currencySymbol = c.currencySymbol;
        currency.value = c.value;
        return currency;
      });
    } else {
      this.activeCurrencies = currencies
        .filter((c) => this.defaultCodes.includes(c.currencyCode))
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
    this.selectedCurrency = this.activeCurrencies[0];
    this.exchgeRateService
      .getRates(this.selectedCurrency.currencyCode)
      .subscribe((res) => {
        this.exchangeRate = res;
        this.refreshCurrencyValues();
      });
  }

  selectedCurrency: any;
  activeCurrencies!: Currency[];
  title = 'Convert';
  exchangeRate: any;

  async changeCurrency(currencyCode?: string) {
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
          const clCurrency = currencies.find(
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
      const toRemove = this.activeCurrencies.filter(
        (c) => !data.selectedCurrencies.includes(c.currencyCode)
      );
      toRemove.forEach((c) => {
        var index = this.activeCurrencies.findIndex(
          (ac) => ac.currencyCode == c.currencyCode
        );
        this.activeCurrencies.splice(index, 1);
      });
      const toAdd = data.selectedCurrencies.filter((currencyCode: string) => {
        var index = this.activeCurrencies.findIndex(
          (ac) => ac.currencyCode === currencyCode
        );
        return index === -1;
      });
      toAdd.forEach((currencyCode: string) => {
        const clCurrency = currencies.find(
          (c) => c.currencyCode === currencyCode
        );
        const newCurrency = new Currency();
        newCurrency.currencyCode = clCurrency!.currencyCode;
        newCurrency.currencyName = clCurrency!.currencyName;
        newCurrency.currencySymbol = clCurrency!.currencySymbol;
        newCurrency.countryCode = clCurrency!.countryCode;
        newCurrency.countryName = clCurrency!.countryName;
        this.activeCurrencies.push(newCurrency);
      });
      if (
        !this.activeCurrencies
          .map((c) => c.countryCode)
          .includes(this.selectedCurrency.currencyCode)
      ) {
        this.selectedCurrency = this.activeCurrencies[0];
      }
      this.updateCurrencyValues();
      return;
    }
  }

  async removeCurrency(currency: Currency) {
    if (this.activeCurrencies.length <= 2) {
      const toast = await this.toastController.create({
        message: 'You must have a minimum of two currencies',
        duration: 2500,
        position: 'bottom',
        color: 'warning',
        icon: 'warning',
      });

      await toast.present();
      return;
    }
    this.activeCurrencies = this.activeCurrencies.filter(
      (c) => c.currencyCode !== currency.currencyCode
    );
  }

  onCurrencyItemClicked(currency: any) {
    this.selectedCurrency = currency;
    this.refreshCurrencyValues();
    this.getCurrencyHelper(currency);
  }

  getCurrencyHelper(currency: Currency) {
    if (
      !currency ||
      !this.exchangeRate ||
      !currency.value ||
      this.selectedCurrency.currencyCode === currency.currencyCode
    ) {
      return null;
    }
    return `1 ${this.selectedCurrency.currencyCode} = ${round(
      this.exchangeRate.conversion_rates[currency.currencyCode],
      4
    )} ${currency.currencyCode}`;
  }

  getColor(currency: any): string {
    return this.selectedCurrency === currency ? 'light' : '';
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.activeCurrencies = ev.detail.complete(this.activeCurrencies);
    this.cacheCurrencies();
  }

  currencyValueChanged(event: InputCustomEvent, currency: Currency) {
    const value = +event.detail.value!;
    currency.value = !value ? null : round(value, 2);
    this.selectedCurrency = currency;
    this.refreshCurrencyValues();
  }

  getCurrencyInputLabel(currency: Currency) {
    return (currency.value ?? 0) > 0 ? currency.currencySymbol : '';
  }

  private refreshCurrencyValues() {
    if (!this.selectedCurrency) {
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
      c.value = !this.selectedCurrency.value
        ? null
        : round(
            this.selectedCurrency.value *
              this.exchangeRate.conversion_rates[c.currencyCode],
            2
          );
    });
    this.cacheCurrencies();
  }

  private cacheCurrencies() {
    this.cacheService.cacheRequest(this.cacheKey, this.activeCurrencies);
  }
}
