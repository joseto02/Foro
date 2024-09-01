import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Noticia2Page } from './noticia-2.page';

describe('Noticia2Page', () => {
  let component: Noticia2Page;
  let fixture: ComponentFixture<Noticia2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Noticia2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
