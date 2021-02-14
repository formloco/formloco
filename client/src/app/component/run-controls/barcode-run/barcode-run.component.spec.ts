import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeRunComponent } from './barcode-run.component';

describe('BarcodeRunComponent', () => {
  let component: BarcodeRunComponent;
  let fixture: ComponentFixture<BarcodeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
