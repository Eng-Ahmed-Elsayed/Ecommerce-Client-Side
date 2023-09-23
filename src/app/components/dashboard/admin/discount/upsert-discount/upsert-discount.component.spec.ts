import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertDiscountComponent } from './upsert-discount.component';

describe('UpsertDiscountComponent', () => {
  let component: UpsertDiscountComponent;
  let fixture: ComponentFixture<UpsertDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertDiscountComponent]
    });
    fixture = TestBed.createComponent(UpsertDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
