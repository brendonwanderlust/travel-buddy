import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySelectionModalComponent } from './currency-selection-modal.component';

describe('CurrencySelectionModalComponent', () => {
  let component: CurrencySelectionModalComponent;
  let fixture: ComponentFixture<CurrencySelectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencySelectionModalComponent]
    });
    fixture = TestBed.createComponent(CurrencySelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
