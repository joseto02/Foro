import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foro5Page } from './foro-5.page';

describe('Foro5Page', () => {
  let component: Foro5Page;
  let fixture: ComponentFixture<Foro5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Foro5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
