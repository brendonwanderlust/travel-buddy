import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UnitConvertPage } from './unit-convert.page';

describe('UnitConvertPage', () => {
  let component: UnitConvertPage;
  let fixture: ComponentFixture<UnitConvertPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitConvertPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitConvertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
