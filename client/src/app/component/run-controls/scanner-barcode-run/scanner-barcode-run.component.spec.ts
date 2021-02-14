import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerBarcodeRunComponent } from './scanner-barcode-run.component';

describe('ScannerBarcodeRunComponent', () => {
  let component: ScannerBarcodeRunComponent;
  let fixture: ComponentFixture<ScannerBarcodeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerBarcodeRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerBarcodeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
