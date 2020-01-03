import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisePhotoComponentComponent } from './prise-photo-component.component';

describe('PrisePhotoComponentComponent', () => {
  let component: PrisePhotoComponentComponent;
  let fixture: ComponentFixture<PrisePhotoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrisePhotoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisePhotoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
