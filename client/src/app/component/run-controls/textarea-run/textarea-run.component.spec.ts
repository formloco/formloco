import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaRunComponent } from './textarea-run.component';

describe('TextareaRunComponent', () => {
  let component: TextareaRunComponent;
  let fixture: ComponentFixture<TextareaRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
