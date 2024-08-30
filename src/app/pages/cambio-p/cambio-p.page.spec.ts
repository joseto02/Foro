import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioPPage } from './cambio-p.page';

describe('CambioPPage', () => {
  let component: CambioPPage;
  let fixture: ComponentFixture<CambioPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
