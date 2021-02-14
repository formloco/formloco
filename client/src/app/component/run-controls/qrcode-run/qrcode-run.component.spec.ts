import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRunComponent } from './qrcode-run.component';

describe('QrcodeRunComponent', () => {
  let component: QrcodeRunComponent;
  let fixture: ComponentFixture<QrcodeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
