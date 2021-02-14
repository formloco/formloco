import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantLayoutComponent } from './tenant-layout.component';

describe('TenantLayoutComponent', () => {
  let component: TenantLayoutComponent;
  let fixture: ComponentFixture<TenantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
