import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioUPage } from './cambio-u.page';

describe('CambioUPage', () => {
  let component: CambioUPage;
  let fixture: ComponentFixture<CambioUPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
