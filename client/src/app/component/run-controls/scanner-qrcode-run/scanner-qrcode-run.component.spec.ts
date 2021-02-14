import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerQrcodeRunComponent } from './scanner-qrcode-run.component';

describe('ScannerQrcodeRunComponent', () => {
  let component: ScannerQrcodeRunComponent;
  let fixture: ComponentFixture<ScannerQrcodeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerQrcodeRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerQrcodeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
