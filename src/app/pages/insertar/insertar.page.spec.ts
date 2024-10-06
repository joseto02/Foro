import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertarPage } from './insertar.page';

describe('InsertarPage', () => {
  let component: InsertarPage;
  let fixture: ComponentFixture<InsertarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
