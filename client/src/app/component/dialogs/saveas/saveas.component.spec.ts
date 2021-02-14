import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaveasComponent } from './saveas.component';

describe('SaveasComponent', () => {
  let component: SaveasComponent;
  let fixture: ComponentFixture<SaveasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
