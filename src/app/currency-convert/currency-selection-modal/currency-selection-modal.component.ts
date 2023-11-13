import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { currencies } from 'src/app/models/currencies';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'currency-selection-modal',
  templateUrl: './currency-selection-modal.component.html',
  styleUrls: ['./currency-selection-modal.component.scss'],
})
export class CurrencySelectionModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  @Input() currencyToReplace!: string;
  @Input() activeCurrencies!: string[];

  currencySearchResults!: ModalCurrency[];

  ngOnInit(): void {
    this.currencySearchResults = [
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
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.currencySearchResults = currencies
      .filter((c) => c.currencyName.toLowerCase().indexOf(query) > -1)
      .map((c) => {
        const currency = new ModalCurrency();
        currency.countryCode = c.countryCode;
        currency.countryName = c.countryName;
        currency.currencyCode = c.currencyCode;
        currency.currencyName = c.currencyName;
        currency.currencySymbol = c.currencySymbol;
        currency.isSelected =
          this.currencySearchResults.find(
            (cr) => cr.currencyCode === c.currencyCode
          )?.isSelected ?? false;
        return currency;
      });
  }

  onCurrencyItemClicked(currency: ModalCurrency) {
    if (!!this.currencyToReplace) {
      // check if at least two currencies are selected
      this.confirm(currency);
      return;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(currency?: ModalCurrency) {
    if (!!currency) {
      return this.modalCtrl.dismiss(
        {
          currencyToReplace: this.currencyToReplace,
          replacementCurrency: currency.currencyCode,
        },
        'confirm'
      );
    } else {
      return this.modalCtrl.dismiss(
        {
          selectedCurrencies: this.currencySearchResults
            .filter((r) => r.isSelected)
            .map((r) => r.currencyCode),
        },
        'confirm'
      );
    }
  }
}

class ModalCurrency extends Currency {
  isSelected!: boolean;
}
