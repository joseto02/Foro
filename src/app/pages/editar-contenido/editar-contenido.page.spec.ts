import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContenidoPage } from './editar-contenido.page';

describe('EditarContenidoPage', () => {
  let component: EditarContenidoPage;
  let fixture: ComponentFixture<EditarContenidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
