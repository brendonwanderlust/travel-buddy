export enum MeasurementSystem {
  Imperial = 'imperial',
  Metric = 'metric',
}

export enum UnitType {
  Length,
  Mass,
  Speed,
  Temperature,
}

export interface IUnitType {
  icon: string;
  name: string;
  uoms: IUnitOfMeasure[] | undefined;
}

export interface IUnitOfMeasure {
  type: UnitType;
  abbr: string;
  system: MeasurementSystem | string;
  measure: string;
  singular: string;
  plural: string;
  icon: string;
  value: number | undefined;
}

export function getUnitType(measure: string): UnitType {
  switch (measure) {
    case 'Length':
      return UnitType.Length;
    case 'mass':
      return UnitType.Mass;
    case 'speed':
      return UnitType.Speed;
    case 'temperature':
      return UnitType.Temperature;
    default:
      throw 'Unit Type Not Defined';
  }
}

export function getUnitTypeIcon(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Length:
      return 'resize-outline';
    case UnitType.Mass:
      return 'barbell-outline';
    case UnitType.Speed:
      return 'speedometer';
    case UnitType.Temperature:
      return 'thermometer';
    default:
      return '';
  }
}

export function getUnitTypeName(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Length:
      return 'Length';
    case UnitType.Mass:
      return 'Mass';
    case UnitType.Speed:
      return 'Speed';
    case UnitType.Temperature:
      return 'Temperature';
    default:
      return '';
  }
}

export function getUnitTypeString(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.Length:
      return 'length';
    case UnitType.Mass:
      return 'mass';
    case UnitType.Speed:
      return 'speed';
    case UnitType.Temperature:
      return 'temperature';
    default:
      return '';
  }
}
