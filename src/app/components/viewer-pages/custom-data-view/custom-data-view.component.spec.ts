import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataViewComponent } from './custom-data-view.component';

describe('CustomDataViewComponent', () => {
  let component: CustomDataViewComponent;
  let fixture: ComponentFixture<CustomDataViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDataViewComponent]
    });
    fixture = TestBed.createComponent(CustomDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
