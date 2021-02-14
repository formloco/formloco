import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormLibraryComponent } from './form-library.component';

describe('FormLibraryComponent', () => {
  let component: FormLibraryComponent;
  let fixture: ComponentFixture<FormLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
