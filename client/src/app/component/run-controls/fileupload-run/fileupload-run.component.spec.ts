import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileuploadRunComponent } from './fileupload-run.component';

describe('FileuploadRunComponent', () => {
  let component: FileuploadRunComponent;
  let fixture: ComponentFixture<FileuploadRunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
