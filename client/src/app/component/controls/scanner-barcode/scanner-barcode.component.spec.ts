import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerBarcodeComponent } from './scanner-barcode.component';

describe('ScannerBarcodeComponent', () => {
  let component: ScannerBarcodeComponent;
  let fixture: ComponentFixture<ScannerBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerBarcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
