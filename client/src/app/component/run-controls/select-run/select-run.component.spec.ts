import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectRunComponent } from './select-run.component';

describe('SelectRunComponent', () => {
  let component: SelectRunComponent;
  let fixture: ComponentFixture<SelectRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
