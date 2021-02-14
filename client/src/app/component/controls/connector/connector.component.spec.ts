import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectorComponent } from './connector.component';

describe('ConnectorComponent', () => {
  let component: ConnectorComponent;
  let fixture: ComponentFixture<ConnectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
