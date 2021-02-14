import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectorsComponent } from './connectors.component';

describe('ConnectorsComponent', () => {
  let component: ConnectorsComponent;
  let fixture: ComponentFixture<ConnectorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
