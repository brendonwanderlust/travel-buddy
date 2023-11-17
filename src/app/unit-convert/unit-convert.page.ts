import { Component } from '@angular/core';

@Component({
  selector: 'unit-convert',
  templateUrl: 'unit-convert.page.html',
  styleUrls: ['unit-convert.page.scss'],
})
export class UnitConvertPage {
  constructor() {}

  title = 'Convert Units';

  log(e: any) {
    console.log(e);
  }
}
