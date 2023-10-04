import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductColorsComponent } from './custom-product-colors.component';

describe('CustomProductColorsComponent', () => {
  let component: CustomProductColorsComponent;
  let fixture: ComponentFixture<CustomProductColorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomProductColorsComponent]
    });
    fixture = TestBed.createComponent(CustomProductColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
