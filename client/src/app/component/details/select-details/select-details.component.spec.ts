import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectDetailsComponent } from './select-details.component';

describe('SelectDetailsComponent', () => {
  let component: SelectDetailsComponent;
  let fixture: ComponentFixture<SelectDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
