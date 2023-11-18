import { Component } from '@angular/core';
import { SelectChangeEventDetail } from '@ionic/angular';
import {
  InputChangeEventDetail,
  IonInputCustomEvent,
  IonSelectCustomEvent,
} from '@ionic/core';
import uc from 'any-unit-converter';
import {
  Length,
  Mass,
  Temperature,
  UNIT_TYPE,
} from 'any-unit-converter/lib/interface';

@Component({
  selector: 'unit-convert',
  templateUrl: 'unit-convert.page.html',
  styleUrls: ['unit-convert.page.scss'],
})
export class UnitConvertPage {
  readonly title = 'Convert Units';
  readonly unitTypes: UnitType[] = [
    { type: UNIT_TYPE.MASS, units: Mass, icon: 'barbell-outline' },
    { type: UNIT_TYPE.LENGTH, units: Length, icon: 'resize-outline' },
    { type: UNIT_TYPE.TEMPERATURE, units: Temperature, icon: 'thermometer' },
  ];

  constructor() {
    this.unitTypes.forEach((unitType) => {
      Object.keys(unitType.units).forEach((key, index) => {
        this.uomList.push({
          type: unitType.type,
          name: key,
          symbol: Object.values(unitType.units)[index],
        });
      });
    });
  }

  uomList: IUnitOfMeasure[] = [];
  conversions: ConvertibleItem[] = [];

  addConversionItem(type: UnitType) {
    this.conversions.push({
      id: crypto.randomUUID(),
      type: type.type,
      unitTop: undefined,
      unitBottom: undefined,
      units: this.uomList.filter((uom) => uom.type === type.type),
    });
  }

  onTopUnitChanged(
    ev: IonSelectCustomEvent<SelectChangeEventDetail<ConvertibleItem>>,
    item: ConvertibleItem
  ) {
    const unitTop = {
      ...this.uomList.find((u) => u.name === ev.target.value),
    } as UnitOfMeasure;

    unitTop.value = item.unitTop?.value;
    item.unitTop = unitTop;
    this.log(item.unitTop);
    this.log(item);
  }

  onBottomUnitChanged(
    ev: IonSelectCustomEvent<SelectChangeEventDetail<ConvertibleItem>>,
    item: ConvertibleItem
  ) {
    const unitBottom = {
      ...this.uomList.find((u) => u.name === ev.target.value),
    } as UnitOfMeasure;

    unitBottom.value = item.unitBottom?.value;
    item.unitBottom = unitBottom;
    this.log(item.unitBottom);
    this.log(item);
  }

  topValueChanged(
    $event: IonInputCustomEvent<InputChangeEventDetail>,
    item: ConvertibleItem
  ) {
    const value = $event.detail.value ? Number($event.detail.value) : undefined;
    if (item.unitTop) {
      item.unitTop.value = value;
    } else {
      item.unitTop = { value: value } as UnitOfMeasure;
    }
    if (item.unitBottom) {
      item.unitBottom.value = item.unitTop.value
        ? Number(
            uc.convert(
              item.unitTop.value,
              Mass.Gram,
              Mass.Pound,
              UNIT_TYPE.MASS
            )
          )
        : undefined;
    }
  }

  bottomValueChanged(
    $event: IonInputCustomEvent<InputChangeEventDetail>,
    item: ConvertibleItem
  ) {
    const value = $event.detail.value ? Number($event.detail.value) : undefined;
    if (item.unitBottom) {
      item.unitBottom.value = value;
    } else {
      item.unitBottom = { value: value } as UnitOfMeasure;
    }
  }

  log(e: any) {
    console.log(e);
  }
}

interface UnitType {
  type: UNIT_TYPE;
  units: typeof Mass | typeof Length | typeof Temperature;
  icon: string;
}

interface IUnitOfMeasure {
  type: UNIT_TYPE;
  name: string;
  symbol: string;
  value?: number;
}

class UnitOfMeasure implements IUnitOfMeasure {
  type!: UNIT_TYPE;
  name!: string;
  symbol!: string;
  value?: number;
}

interface IConvertibleItem {
  id: string;
  type: UNIT_TYPE;
  units: IUnitOfMeasure[];
  unitTop?: IUnitOfMeasure;
  unitBottom?: IUnitOfMeasure;
}

class ConvertibleItem implements IConvertibleItem {
  id!: string;
  type!: UNIT_TYPE;
  units: IUnitOfMeasure[] = [];
  unitTop?: IUnitOfMeasure;
  unitBottom?: IUnitOfMeasure;
}

// { type: 'volume', name: 'Volume', icon: 'flask-outline' }, // beaker-outline
// { type: 'time', name: 'Time', icon: 'time-outline' },
// { type: 'current', name: 'Current', icon: 'flash-outline' },
// { type: 'speed', name: 'Speed', icon: 'speedometer' },
