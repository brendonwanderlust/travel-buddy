import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import * as fs from 'fs';
import * as path from 'path';
import { currencies } from '../models/currencies';

@Component({
  selector: 'currency-convert',
  templateUrl: 'currency-convert.page.html',
  styleUrls: ['currency-convert.page.scss'],
})
export class CurrencyConvertPage {
  constructor() {}

  title = 'Convert';
  countries = [
    { name: 'Country1', flag: 'flag1.jpg', currency: 'Currency1' },
    { name: 'Country2', flag: 'flag2.jpg', currency: 'Currency2' },
    // Add more countries as needed
  ];

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.countries = ev.detail.complete(this.countries);
    const countriesNotFound: any = [];
    const dirPath =
      'C:/Users/Brend/Downloads/197373-country-flags/197373-country-flags/png';

    fs.readdir(dirPath, (err: any, files: any) => {
      if (err) throw err;

      // Iterate over the files
      for (const file of files) {
        // Split the filename into number and country name
        const [number, countryName] = file.split('-');

        const countryCode = currencies.find(
          (c) => c.countryName?.toLowerCase() === countryName
        );

        // If the country code exists, rename the file
        if (countryCode) {
          const oldPath = path.join(dirPath, file);
          const newPath = path.join(dirPath, `${number}-${countryCode}.png`);
          console.log('oldPath: ', oldPath);
          console.log('newPath: ', newPath);
          console.log('file: ', file);
          // fs.rename(oldPath, newPath, (err: any) => {
          //   if (err) throw err;
          // });
        } else {
          countriesNotFound.push(countryName);
        }
      }
    });

    // save countries list to userSettings
  }
}
