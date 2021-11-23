import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitOnKeypressComponent } from './form-submit-on-keypress.component';

describe('FormSubmitOnKeypressComponent', () => {
  let component: FormSubmitOnKeypressComponent;
  let fixture: ComponentFixture<FormSubmitOnKeypressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmitOnKeypressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitOnKeypressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
