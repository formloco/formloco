import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormListsComponent } from './form-lists.component';

describe('FormListsComponent', () => {
  let component: FormListsComponent;
  let fixture: ComponentFixture<FormListsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
