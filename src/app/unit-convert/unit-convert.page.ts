import { Component } from '@angular/core';
import * as ConvertUnits from 'convert-units';
import { UnitConversionService } from '../services/unit-conversion.service';
import { SelectChangeEventDetail } from '@ionic/angular';
import {
  InputChangeEventDetail,
  IonInputCustomEvent,
  IonSelectCustomEvent,
} from '@ionic/core';
import {
  IUnitOfMeasure,
  IUnitTypeItem,
  UnitType,
  getUOMName,
  getUnitType,
  getUnitTypeIcon,
  getUnitTypeName,
  getUnitTypeString,
} from '../models/units';

@Component({
  selector: 'unit-convert',
  templateUrl: 'unit-convert.page.html',
  styleUrls: ['unit-convert.page.scss'],
})
export class UnitConvertPage {
  readonly title = 'Convert Units';

  constructor(private unitConversionService: UnitConversionService) {
    this.init();
  }

  topToBottom: boolean = false;
  unitTypes!: IUnitTypeItem[];
  uomList: IUnitOfMeasure[] = [];
  selectedUnitType!: IUnitTypeItem;
  selectedUnitTop!: IUnitOfMeasure;
  selectedUnitBottom!: IUnitOfMeasure;

  onTopUnitChanged(
    ev: IonSelectCustomEvent<SelectChangeEventDetail<any>>,
    item: IUnitOfMeasure
  ) {
    const unitTop = {
      ...this.uomList.find((u) => u.abbr === ev.target.value),
    } as IUnitOfMeasure;
    unitTop.value = item.value;
    this.selectedUnitTop = unitTop;
    this.selectedUnitBottom.value = this.unitConversionService.convert(
      unitTop.value,
      this.selectedUnitTop.abbr,
      this.selectedUnitBottom.abbr,
      this.selectedUnitType.type
    );
  }

  onBottomUnitChanged(
    ev: IonSelectCustomEvent<SelectChangeEventDetail<any>>,
    item: IUnitOfMeasure
  ) {
    const unitBottom = {
      ...this.uomList.find((u) => u.abbr === ev.target.value),
    } as IUnitOfMeasure;

    unitBottom.value = item?.value;
    this.selectedUnitBottom = unitBottom;
    this.selectedUnitTop.value = this.unitConversionService.convert(
      unitBottom.value,
      this.selectedUnitBottom.abbr,
      this.selectedUnitTop.abbr,
      this.selectedUnitType.type
    );
  }

  topValueChanged($event: IonInputCustomEvent<InputChangeEventDetail>) {
    const value = $event.detail.value ? Number($event.detail.value) : undefined;
    this.selectedUnitTop.value = value;
    this.selectedUnitBottom.value = this.unitConversionService.convert(
      value,
      this.selectedUnitTop.abbr,
      this.selectedUnitBottom.abbr,
      this.selectedUnitType.type
    );
  }

  bottomValueChanged(
    $event: IonInputCustomEvent<InputChangeEventDetail>
  ): void {
    const value = $event.detail.value ? Number($event.detail.value) : undefined;
    this.selectedUnitBottom.value = value;
    this.selectedUnitTop.value = this.unitConversionService.convert(
      value,
      this.selectedUnitBottom.abbr,
      this.selectedUnitTop.abbr,
      this.selectedUnitType.type
    );
  }

  onUnitTypeChanged(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    this.selectedUnitType = this.unitTypes.find(
      (u) => u.name === event.detail.value
    )!;
    this.selectedUnitTop = this.uomList.filter(
      (uom) => uom.type === this.selectedUnitType.type
    )[0];
    this.selectedUnitBottom = this.uomList.filter(
      (uom) => uom.type === this.selectedUnitType.type
    )[1];
  }

  private init() {
    this.unitTypes = Object.values(UnitType)
      .filter((v) => isNaN(Number(v)))
      .map((key) => {
        const unitType = getUnitType(key as string);
        const uoms = new ConvertUnits.default()
          .possibilities(getUnitTypeString(unitType))
          .map((p: string) => {
            const uom = new ConvertUnits.default().describe(
              p
            ) as IUnitOfMeasure;
            uom.type = unitType;
            uom.name = getUOMName(uom.plural, uom.type);
            return uom;
          });
        this.uomList.push(...uoms);
        return {
          icon: getUnitTypeIcon(unitType),
          name: getUnitTypeName(unitType),
          type: unitType,
          uoms: uoms,
        } as IUnitTypeItem;
      });
    this.selectedUnitType = this.unitTypes[0];
    this.selectedUnitTop = this.uomList.filter(
      (uom) => uom.type === this.selectedUnitType.type
    )[0];
    this.selectedUnitBottom = this.uomList.filter(
      (uom) => uom.type === this.selectedUnitType.type
    )[1];
  }
}
