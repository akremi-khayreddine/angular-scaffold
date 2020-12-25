import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntractionsComponent } from './intractions.component';

describe('IntractionsComponent', () => {
  let component: IntractionsComponent;
  let fixture: ComponentFixture<IntractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntractionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
