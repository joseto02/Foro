import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenaDetallePage } from './resena-detalle.page';

describe('ResenaDetallePage', () => {
  let component: ResenaDetallePage;
  let fixture: ComponentFixture<ResenaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
