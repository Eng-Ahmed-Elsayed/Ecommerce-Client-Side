import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListButtonComponent } from './check-list-button.component';

describe('CheckListButtonComponent', () => {
  let component: CheckListButtonComponent;
  let fixture: ComponentFixture<CheckListButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckListButtonComponent],
    });
    fixture = TestBed.createComponent(CheckListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
