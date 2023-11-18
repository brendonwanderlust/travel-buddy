import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { currencies } from 'src/app/data/currencies';
import { Currency } from 'src/app/models/currency';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'currency-selection-modal',
  templateUrl: './currency-selection-modal.component.html',
  styleUrls: ['./currency-selection-modal.component.scss'],
})
export class CurrencySelectionModalComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  @Input() currencyToReplace!: string;
  @Input() activeCurrencies!: string[];

  isToastOpen = false;
  currencies!: ModalCurrency[];
  filteredSearchResults!: ModalCurrency[];

  ngOnInit(): void {
    this.currencies = [
      ...currencies.map((c) => {
        const currency = new ModalCurrency();
        currency.countryCode = c.countryCode;
        currency.countryName = c.countryName;
        currency.currencyCode = c.currencyCode;
        currency.currencyName = c.currencyName;
        currency.currencySymbol = c.currencySymbol;
        currency.isSelected = this.activeCurrencies.includes(c.currencyCode);
        return currency;
      }),
    ];
    this.filteredSearchResults = [...this.currencies];
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredSearchResults = this.currencies
      .filter((c) => c.currencyName.toLowerCase().indexOf(query) > -1)
      .map((c) => {
        const currency = new ModalCurrency();
        currency.countryCode = c.countryCode;
        currency.countryName = c.countryName;
        currency.currencyCode = c.currencyCode;
        currency.currencyName = c.currencyName;
        currency.currencySymbol = c.currencySymbol;
        currency.isSelected =
          this.currencies.find((cr) => cr.currencyCode === c.currencyCode)
            ?.isSelected ?? false;
        return currency;
      });
  }

  async onCurrencyItemClicked(currency: ModalCurrency) {
    if (!!this.currencyToReplace) {
      await this.confirm(currency);
      return;
    } else {
      currency.isSelected = !currency.isSelected;
      this.currencies.find(
        (c) => c.currencyCode === currency.currencyCode
      )!.isSelected = currency.isSelected;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm(currency?: ModalCurrency) {
    if (!!currency) {
      return this.modalCtrl.dismiss(
        {
          currencyToReplace: this.currencyToReplace,
          replacementCurrency: currency.currencyCode,
        },
        'confirm'
      );
    }

    if (this.currencies.filter((c) => c.isSelected).length < 2) {
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

    return this.modalCtrl.dismiss(
      {
        selectedCurrencies: this.currencies
          .filter((r) => r.isSelected)
          .map((r) => r.currencyCode),
      },
      'confirm'
    );
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}

class ModalCurrency extends Currency {
  isSelected!: boolean;
}
