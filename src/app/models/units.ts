import {
  Length,
  Mass,
  Temperature,
  UNIT_TYPE,
} from 'any-unit-converter/lib/interface';

export interface UnitType {
  type: UNIT_TYPE;
  name: string;
  units: typeof Mass | typeof Length | typeof Temperature;
  icon: string;
}

export interface IUnitOfMeasure {
  type: UNIT_TYPE;
  name: string;
  symbol: Mass | Length | Temperature;
  value?: number;
}

export class UnitOfMeasure implements IUnitOfMeasure {
  type!: UNIT_TYPE;
  name!: string;
  symbol!: Mass | Length | Temperature;
  value?: number;
}

export interface IConvertibleItem {
  id: string;
  type: UNIT_TYPE;
  units: IUnitOfMeasure[];
  unitTop?: IUnitOfMeasure;
  unitBottom?: IUnitOfMeasure;
}

export class ConvertibleItem implements IConvertibleItem {
  id!: string;
  type!: UNIT_TYPE;
  units: IUnitOfMeasure[] = [];
  unitTop?: IUnitOfMeasure;
  unitBottom?: IUnitOfMeasure;
}
