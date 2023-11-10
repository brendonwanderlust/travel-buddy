export interface ICurrency {
  currencyCode: string;
  countryCode: string;
  countryName: string;
  currencySymbol: string;
  currencyName: string;
  // flagPath: string;
}

export class Currency implements ICurrency {
  currencyCode!: string;
  countryCode!: string;
  countryName!: string;
  currencySymbol!: string;
  currencyName!: string;

  public get flagPath() {
    return `assets/images/flags/${this.countryCode.toLowerCase()}.svg`;
  }
}
