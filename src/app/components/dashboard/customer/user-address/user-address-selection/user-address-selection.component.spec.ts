import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressSelectionComponent } from './user-address-selection.component';

describe('UserAddressSelectionComponent', () => {
  let component: UserAddressSelectionComponent;
  let fixture: ComponentFixture<UserAddressSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddressSelectionComponent],
    });
    fixture = TestBed.createComponent(UserAddressSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
