import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioDetailsComponent } from './radio-details.component';

describe('RadioDetailsComponent', () => {
  let component: RadioDetailsComponent;
  let fixture: ComponentFixture<RadioDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
