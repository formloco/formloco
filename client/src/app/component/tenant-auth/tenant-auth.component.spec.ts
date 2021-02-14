import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantAuthComponent } from './tenant-auth.component';

describe('TenantAuthComponent', () => {
  let component: TenantAuthComponent;
  let fixture: ComponentFixture<TenantAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
