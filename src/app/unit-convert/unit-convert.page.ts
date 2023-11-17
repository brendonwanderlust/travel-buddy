import { Component } from '@angular/core';
import { convert } from 'convert';
import { MeasurementType } from '../models/conversions';

@Component({
  selector: 'unit-convert',
  templateUrl: 'unit-convert.page.html',
  styleUrls: ['unit-convert.page.scss'],
})
export class UnitConvertPage {
  readonly title = 'Convert Units';
  readonly uomTypes: any[] = [
    {
      type: MeasurementType.Mass,
      name: MeasurementType.Mass.toString(),
      icon: 'barbell-outline',
    },
    {
      type: MeasurementType.Temperature,
      name: MeasurementType.Temperature.toString(),
      icon: 'thermometer',
    },
    {
      type: MeasurementType.Length,
      name: MeasurementType.Length.toString(),
      icon: 'resize-outline',
    },
  ];
  constructor() {}

  conversions: any[] = [];

  addConversionItem(type: any) {
    this.conversions.push({
      type: type.type,
      value: null,
      convertedValue: null,
    });
    console.log(type);
    console.log(this.conversions);
  }

  log(e: any) {
    console.log(e);
  }
}

// { type: 'volume', name: 'Volume', icon: 'flask-outline' }, // beaker-outline
// { type: 'time', name: 'Time', icon: 'time-outline' },
// { type: 'current', name: 'Current', icon: 'flash-outline' },
// { type: 'speed', name: 'Speed', icon: 'speedometer' },
