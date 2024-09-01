import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foro4Page } from './foro-4.page';

describe('Foro4Page', () => {
  let component: Foro4Page;
  let fixture: ComponentFixture<Foro4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Foro4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
