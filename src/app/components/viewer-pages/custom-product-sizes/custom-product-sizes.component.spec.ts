import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductSizesComponent } from './custom-product-sizes.component';

describe('CustomProductSizesComponent', () => {
  let component: CustomProductSizesComponent;
  let fixture: ComponentFixture<CustomProductSizesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomProductSizesComponent]
    });
    fixture = TestBed.createComponent(CustomProductSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
