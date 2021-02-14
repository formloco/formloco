import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxDetailsComponent } from './checkbox-details.component';

describe('CheckboxDetailsComponent', () => {
  let component: CheckboxDetailsComponent;
  let fixture: ComponentFixture<CheckboxDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
