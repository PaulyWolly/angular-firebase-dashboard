import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightTestComponent } from './highlight-test.component';

describe('HighlightTestComponent', () => {
  let component: HighlightTestComponent;
  let fixture: ComponentFixture<HighlightTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
