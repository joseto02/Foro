import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeradorPage } from './moderador.page';

describe('ModeradorPage', () => {
  let component: ModeradorPage;
  let fixture: ComponentFixture<ModeradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
