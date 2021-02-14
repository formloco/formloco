import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAppComponent } from './micro-app.component';

describe('MicroAppComponent', () => {
  let component: MicroAppComponent;
  let fixture: ComponentFixture<MicroAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
