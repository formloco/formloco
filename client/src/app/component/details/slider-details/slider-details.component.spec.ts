import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SliderDetailsComponent } from './slider-details.component';

describe('SliderDetailsComponent', () => {
  let component: SliderDetailsComponent;
  let fixture: ComponentFixture<SliderDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
