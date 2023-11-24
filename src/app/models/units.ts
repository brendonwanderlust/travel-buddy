import { TravelBuddyError } from './exceptions';

export enum MeasurementSystem {
  Imperial = 'imperial',
  Metric = 'metric',
}

export enum UnitType {
  Area,
  Length,
  Mass,
  Speed,
  Temperature,
  Time,
  Volume,
}

export interface IUnitTypeItem {
  icon: string;
  name: string;
  type: UnitType;
  uoms: IUnitOfMeasure[] | undefined;
}

export interface IUnitOfMeasure {
  type: UnitType;
  abbr: string;
  name: string;
  system: MeasurementSystem | string;
  measure: string;
  singular: string;
  plural: string;
  icon: string;
  value: number | undefined;
}

// This logic fixes the names in the 'convert-units' package
export function getUOMName(plural: string, unitType: UnitType): string {
  if (unitType === UnitType.Temperature) {
    switch (plural) {
      case 'degrees Celsius':
        return 'Celsius';
      case 'degrees Kelvin':
        return 'Kelvin';
      case 'degrees Fahrenheit':
        return 'Fahrenheit';
      case 'degrees Rankine':
        return 'Rankine';
      default:
        throw new TravelBuddyError('Plural Name Not Defined');
    }
  }

  if (unitType === UnitType.Area) {
    switch (plural) {
      case 'Centimeters':
        return 'Square Centimeters';
      default:
        return plural;
    }
  }

  return plural;
}

export function getUnitType(measure: string): UnitType {
  switch (measure) {
    case 'Area' || 'area':
      return UnitType.Area;
    case 'Length' || 'length':
      return UnitType.Length;
    case 'Mass' || 'mass':
      return UnitType.Mass;
    case 'Speed' || 'speed':
      return UnitType.Speed;
    case 'Temperature' || 'temperature':
      return UnitType.Temperature;
    case 'Volume' || 'volume':
      return UnitType.Volume;
    case 'Time' || 'time':
      return UnitType.Time;
    default:
      throw new TravelBuddyError('Unit Type Not Defined');
  }
}

export function getUnitTypeIcon(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Area:
      return 'crop-outline';
    case UnitType.Length:
      return 'resize-outline';
    case UnitType.Mass:
      return 'barbell-outline';
    case UnitType.Speed:
      return 'speedometer';
    case UnitType.Temperature:
      return 'thermometer';
    case UnitType.Volume:
      return 'flask-outline';
    case UnitType.Time:
      return 'time-outline';
    default:
      throw new TravelBuddyError('Unit Type Not Defined');
  }
}

export function getUnitTypeName(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Area:
      return 'Area';
    case UnitType.Length:
      return 'Length';
    case UnitType.Mass:
      return 'Mass';
    case UnitType.Speed:
      return 'Speed';
    case UnitType.Temperature:
      return 'Temperature';
    case UnitType.Volume:
      return 'Volume';
    case UnitType.Time:
      return 'Time';
    default:
      throw new TravelBuddyError('Unit Type Not Defined');
  }
}

export function getUnitTypeString(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Area:
      return 'area';
    case UnitType.Length:
      return 'length';
    case UnitType.Mass:
      return 'mass';
    case UnitType.Speed:
      return 'speed';
    case UnitType.Temperature:
      return 'temperature';
    case UnitType.Volume:
      return 'volume';
    case UnitType.Time:
      return 'time';
    default:
      throw new TravelBuddyError('Unit Type Not Defined');
  }
}
