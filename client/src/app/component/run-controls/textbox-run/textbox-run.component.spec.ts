import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextboxRunComponent } from './textbox-run.component';

describe('TextboxRunComponent', () => {
  let component: TextboxRunComponent;
  let fixture: ComponentFixture<TextboxRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
