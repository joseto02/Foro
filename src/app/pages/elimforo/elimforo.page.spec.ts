import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElimforoPage } from './elimforo.page';

describe('ElimforoPage', () => {
  let component: ElimforoPage;
  let fixture: ComponentFixture<ElimforoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElimforoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
