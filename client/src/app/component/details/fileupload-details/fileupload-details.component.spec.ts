import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileuploadDetailsComponent } from './fileupload-details.component';

describe('FileuploadDetailsComponent', () => {
  let component: FileuploadDetailsComponent;
  let fixture: ComponentFixture<FileuploadDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
