import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaDetailsComponent } from './textarea-details.component';

describe('TextareaDetailsComponent', () => {
  let component: TextareaDetailsComponent;
  let fixture: ComponentFixture<TextareaDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
