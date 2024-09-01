import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foro2Page } from './foro-2.page';

describe('Foro2Page', () => {
  let component: Foro2Page;
  let fixture: ComponentFixture<Foro2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Foro2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
