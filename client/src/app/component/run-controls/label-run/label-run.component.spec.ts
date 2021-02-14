import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelRunComponent } from './label-run.component';

describe('LabelRunComponent', () => {
  let component: LabelRunComponent;
  let fixture: ComponentFixture<LabelRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
