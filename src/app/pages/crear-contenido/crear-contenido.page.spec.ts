import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearContenidoPage } from './crear-contenido.page';

describe('CrearContenidoPage', () => {
  let component: CrearContenidoPage;
  let fixture: ComponentFixture<CrearContenidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
