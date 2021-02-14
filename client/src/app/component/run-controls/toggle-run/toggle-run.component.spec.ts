import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleRunComponent } from './toggle-run.component';

describe('ToggleRunComponent', () => {
  let component: ToggleRunComponent;
  let fixture: ComponentFixture<ToggleRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
