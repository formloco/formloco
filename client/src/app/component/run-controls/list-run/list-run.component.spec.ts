import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRunComponent } from './list-run.component';

describe('ListRunComponent', () => {
  let component: ListRunComponent;
  let fixture: ComponentFixture<ListRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
