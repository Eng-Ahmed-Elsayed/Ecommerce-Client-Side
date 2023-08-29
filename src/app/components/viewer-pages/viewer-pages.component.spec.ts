import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPagesComponent } from './viewer-pages.component';

describe('ViewerPagesComponent', () => {
  let component: ViewerPagesComponent;
  let fixture: ComponentFixture<ViewerPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewerPagesComponent]
    });
    fixture = TestBed.createComponent(ViewerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
