import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectMultiComponent } from './select-multi.component';

describe('SelectMultiComponent', () => {
  let component: SelectMultiComponent;
  let fixture: ComponentFixture<SelectMultiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
