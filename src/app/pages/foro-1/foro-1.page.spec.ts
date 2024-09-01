import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foro1Page } from './foro-1.page';

describe('Foro1Page', () => {
  let component: Foro1Page;
  let fixture: ComponentFixture<Foro1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Foro1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
