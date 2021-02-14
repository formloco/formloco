import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextboxDetailsComponent } from './textbox-details.component';

describe('TextboxDetailsComponent', () => {
  let component: TextboxDetailsComponent;
  let fixture: ComponentFixture<TextboxDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
