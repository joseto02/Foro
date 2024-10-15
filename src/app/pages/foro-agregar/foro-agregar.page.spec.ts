import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForoAgregarPage } from './foro-agregar.page';

describe('ForoAgregarPage', () => {
  let component: ForoAgregarPage;
  let fixture: ComponentFixture<ForoAgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoAgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
