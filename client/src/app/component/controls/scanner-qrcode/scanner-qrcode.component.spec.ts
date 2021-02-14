import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerQrcodeComponent } from './scanner-qrcode.component';

describe('ScannerQrcodeComponent', () => {
  let component: ScannerQrcodeComponent;
  let fixture: ComponentFixture<ScannerQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
