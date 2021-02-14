import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GpsRunComponent } from './gps-run.component';

describe('GpsRunComponent', () => {
  let component: GpsRunComponent;
  let fixture: ComponentFixture<GpsRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
