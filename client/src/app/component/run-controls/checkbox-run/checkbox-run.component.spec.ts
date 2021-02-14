import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxRunComponent } from './checkbox-run.component';

describe('CheckboxRunComponent', () => {
  let component: CheckboxRunComponent;
  let fixture: ComponentFixture<CheckboxRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
