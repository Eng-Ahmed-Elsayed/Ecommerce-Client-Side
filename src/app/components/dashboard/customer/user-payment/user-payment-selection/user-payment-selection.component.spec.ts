import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentSelectionComponent } from './user-payment-selection.component';

describe('UserPaymentSelectionComponent', () => {
  let component: UserPaymentSelectionComponent;
  let fixture: ComponentFixture<UserPaymentSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentSelectionComponent]
    });
    fixture = TestBed.createComponent(UserPaymentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
