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
import {
  UnitType,
  IUnitOfMeasure,
  ConvertibleItem,
  UnitOfMeasure,
} from '../models/units';

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
    this.performConversion(
      'bottom',
      item,
      item.unitTop.symbol,
      item.unitBottom?.symbol,
      unitTop.value
    );
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
    this.performConversion(
      'top',
      item,
      item.unitBottom.symbol,
      item.unitTop?.symbol,
      unitBottom.value
    );
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
    this.performConversion(
      'bottom',
      item,
      item.unitTop.symbol,
      item.unitBottom?.symbol,
      value
    );
  }

  bottomValueChanged(
    $event: IonInputCustomEvent<InputChangeEventDetail>,
    item: ConvertibleItem
  ): void {
    const value = $event.detail.value ? Number($event.detail.value) : undefined;
    if (item.unitBottom) {
      item.unitBottom.value = value;
    } else {
      item.unitBottom = { value: value } as UnitOfMeasure;
    }
    this.performConversion(
      'top',
      item,
      item.unitBottom.symbol,
      item.unitTop?.symbol,
      value
    );
  }

  performConversion(
    conversionLocation: 'top' | 'bottom',
    item: ConvertibleItem,
    from?: Mass | Length | Temperature,
    to?: Mass | Length | Temperature,
    value?: number
  ) {
    if (
      !item.unitTop ||
      !item.unitBottom ||
      value === undefined ||
      value === null ||
      !from ||
      !to
    ) {
      return;
    }

    const convertedValue = uc.convert(value, from, to, item.type);
    if (conversionLocation === 'top') {
      item.unitTop.value = +convertedValue;
    } else {
      item.unitBottom.value = +convertedValue;
    }
  }

  // getUnit(unitType: UNIT_TYPE, symbol: string): Mass | Length | Temperature {
  //   switch (unitType) {
  //     default:
  //       {
  //         console.log(
  //           Mass[Object.values(Mass).findIndex((value) => value === symbol)]
  //         );
  //       }
  //       return;
  //   }
  // }
}
// { type: 'volume', name: 'Volume', icon: 'flask-outline' }, // beaker-outline
// { type: 'time', name: 'Time', icon: 'time-outline' },
// { type: 'current', name: 'Current', icon: 'flash-outline' },
// { type: 'speed', name: 'Speed', icon: 'speedometer' },
