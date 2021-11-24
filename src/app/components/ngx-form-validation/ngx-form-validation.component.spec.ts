import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormValidationComponent } from './ngx-form-validation.component';

describe('NgxFormValidationComponent', () => {
  let component: NgxFormValidationComponent;
  let fixture: ComponentFixture<NgxFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFormValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
