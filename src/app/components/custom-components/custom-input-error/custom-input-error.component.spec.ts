import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputErrorComponent } from './custom-input-error.component';

describe('CustomInputErrorComponent', () => {
  let component: CustomInputErrorComponent;
  let fixture: ComponentFixture<CustomInputErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputErrorComponent]
    });
    fixture = TestBed.createComponent(CustomInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
