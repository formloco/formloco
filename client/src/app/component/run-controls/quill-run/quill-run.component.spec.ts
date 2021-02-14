import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillRunComponent } from './quill-run.component';

describe('QuillRunComponent', () => {
  let component: QuillRunComponent;
  let fixture: ComponentFixture<QuillRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
