import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Noticia1Page } from './noticia-1.page';

describe('Noticia1Page', () => {
  let component: Noticia1Page;
  let fixture: ComponentFixture<Noticia1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Noticia1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
