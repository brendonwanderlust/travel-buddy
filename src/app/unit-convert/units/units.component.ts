import { Component } from '@angular/core';
import {
  Length,
  Mass,
  Temperature,
  UNIT_TYPE,
} from 'any-unit-converter/lib/interface';
import { UnitType } from 'src/app/models/units';

@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
})
export class UnitsComponent {
  // readonly unitTypes: UnitType[] = [
  //   { type: UNIT_TYPE.MASS, units: Mass,  icon: 'barbell-outline' },
  //   { type: UNIT_TYPE.LENGTH, units: Length, icon: 'resize-outline' },
  //   { type: UNIT_TYPE.TEMPERATURE, units: Temperature, icon: 'thermometer' },
  // ];

  onUnitTypeClicked(unitType: UnitType) {
    console.log(unitType);
  }
}
