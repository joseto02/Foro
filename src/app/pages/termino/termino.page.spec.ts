import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminoPage } from './termino.page';

describe('TerminoPage', () => {
  let component: TerminoPage;
  let fixture: ComponentFixture<TerminoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
