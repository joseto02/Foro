import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminForoPage } from './admin-foro.page';

describe('AdminForoPage', () => {
  let component: AdminForoPage;
  let fixture: ComponentFixture<AdminForoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
