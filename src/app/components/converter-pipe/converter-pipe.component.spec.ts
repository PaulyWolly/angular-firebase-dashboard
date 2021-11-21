import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPipeComponent } from './converter-pipe.component';

describe('ConverterPipeComponent', () => {
  let component: ConverterPipeComponent;
  let fixture: ComponentFixture<ConverterPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterPipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
