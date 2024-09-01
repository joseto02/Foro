import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvpasPage } from './olvpas.page';

describe('OlvpasPage', () => {
  let component: OlvpasPage;
  let fixture: ComponentFixture<OlvpasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvpasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
