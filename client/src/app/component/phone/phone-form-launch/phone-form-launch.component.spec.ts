import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhoneFormLaunchComponent } from './phone-form-launch.component';

describe('PhoneFormLaunchComponent', () => {
  let component: PhoneFormLaunchComponent;
  let fixture: ComponentFixture<PhoneFormLaunchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneFormLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFormLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
