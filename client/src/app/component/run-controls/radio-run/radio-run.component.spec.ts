import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioRunComponent } from './radio-run.component';

describe('RadioRunComponent', () => {
  let component: RadioRunComponent;
  let fixture: ComponentFixture<RadioRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
