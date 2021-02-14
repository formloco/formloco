import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeDetailsComponent } from './barcode-details.component';

describe('BarcodeDetailsComponent', () => {
  let component: BarcodeDetailsComponent;
  let fixture: ComponentFixture<BarcodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
