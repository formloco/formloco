import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAppRunComponent } from './micro-app-run.component';

describe('MicroAppRunComponent', () => {
  let component: MicroAppRunComponent;
  let fixture: ComponentFixture<MicroAppRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroAppRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroAppRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
