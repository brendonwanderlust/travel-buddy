export interface ICurrency {
  currencyCode: string;
  countryCode: string;
  countryName: string;
  currencySymbol: string;
  currencyName: string;
  value?: number | null;
}

export class Currency implements ICurrency {
  currencyCode!: string;
  countryCode!: string;
  countryName!: string;
  currencySymbol!: string;
  currencyName!: string;
  value?: number | undefined | null;

  public get flagPath() {
    return `assets/images/flags/${this.countryCode.toLowerCase()}.svg`;
  }
}
