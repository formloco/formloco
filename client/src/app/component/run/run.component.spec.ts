import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RunComponent } from './run.component';

describe('RunComponent', () => {
  let component: RunComponent;
  let fixture: ComponentFixture<RunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});