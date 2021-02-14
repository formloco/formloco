import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SliderRunComponent } from './slider-run.component';

describe('SliderRunComponent', () => {
  let component: SliderRunComponent;
  let fixture: ComponentFixture<SliderRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
