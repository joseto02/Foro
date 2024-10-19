import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstrenosPage } from './estrenos.page';

describe('EstrenosPage', () => {
  let component: EstrenosPage;
  let fixture: ComponentFixture<EstrenosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
