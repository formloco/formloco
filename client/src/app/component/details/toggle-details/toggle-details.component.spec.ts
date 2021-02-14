import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleDetailsComponent } from './toggle-details.component';

describe('ToggleDetailsComponent', () => {
  let component: ToggleDetailsComponent;
  let fixture: ComponentFixture<ToggleDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
