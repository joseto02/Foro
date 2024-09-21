import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaneoPage } from './baneo.page';

describe('BaneoPage', () => {
  let component: BaneoPage;
  let fixture: ComponentFixture<BaneoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BaneoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
