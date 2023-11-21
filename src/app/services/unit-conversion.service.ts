import { Injectable } from '@angular/core';
import * as ConvertUnits from 'convert-units';
import { UnitType } from '../models/units';
import { TravelBuddyError } from '../models/exceptions';
import { round } from 'src/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UnitConversionService {
  constructor() {}

  convert(
    value: number | undefined | null,
    fromAbbr: string,
    toAbbr: string,
    unitType: UnitType
  ): number | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    const convertVal = new ConvertUnits.default(value);
    switch (unitType) {
      case UnitType.Area:
        return convertVal.from(fromAbbr).to(toAbbr);
      case UnitType.Length:
        return convertVal.from(fromAbbr).to(toAbbr);
      case UnitType.Mass:
        return convertVal.from(fromAbbr).to(toAbbr);
      case UnitType.Speed:
        return convertVal.from(fromAbbr).to(toAbbr);
      case UnitType.Temperature:
        return round(convertVal.from(fromAbbr).to(toAbbr), 1);
      case UnitType.Volume:
        return convertVal.from(fromAbbr).to(toAbbr);
      case UnitType.Time:
        return convertVal.from(fromAbbr).to(toAbbr);
      default:
        throw new TravelBuddyError('Unit Type Not Defined');
    }
  }
}
