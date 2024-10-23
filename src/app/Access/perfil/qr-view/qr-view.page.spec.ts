import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrViewPage } from './qr-view.page';

describe('QrViewPage', () => {
  let component: QrViewPage;
  let fixture: ComponentFixture<QrViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
