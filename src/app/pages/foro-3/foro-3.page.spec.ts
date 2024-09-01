import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Foro3Page } from './foro-3.page';

describe('Foro3Page', () => {
  let component: Foro3Page;
  let fixture: ComponentFixture<Foro3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Foro3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
