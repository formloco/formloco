import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormsComponent } from './data-forms.component';

describe('DataFormsComponent', () => {
  let component: DataFormsComponent;
  let fixture: ComponentFixture<DataFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
