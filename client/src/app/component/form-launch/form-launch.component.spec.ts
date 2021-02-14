import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormLaunchComponent } from './form-launch.component';

describe('FormLaunchComponent', () => {
  let component: FormLaunchComponent;
  let fixture: ComponentFixture<FormLaunchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
