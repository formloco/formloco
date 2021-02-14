import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNavigationComponent } from './tenant-navigation.component';

describe('TenantNavigationComponent', () => {
  let component: TenantNavigationComponent;
  let fixture: ComponentFixture<TenantNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
