import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhoneNavigationComponent } from './phone-navigation.component';

describe('PhoneNavigationComponent', () => {
  let component: PhoneNavigationComponent;
  let fixture: ComponentFixture<PhoneNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
