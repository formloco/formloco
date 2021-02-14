import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhoneWorkspaceComponent } from './phone-workspace.component';

describe('PhoneWorkspaceComponent', () => {
  let component: PhoneWorkspaceComponent;
  let fixture: ComponentFixture<PhoneWorkspaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
