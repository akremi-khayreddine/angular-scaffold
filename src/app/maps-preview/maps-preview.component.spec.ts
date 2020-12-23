import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPreviewComponent } from './maps-preview.component';

describe('MapsPreviewComponent', () => {
  let component: MapsPreviewComponent;
  let fixture: ComponentFixture<MapsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
