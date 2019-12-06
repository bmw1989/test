import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanComponentMentionComponent } from './scan-component-mention.component';

describe('ScanComponentMentionComponent', () => {
  let component: ScanComponentMentionComponent;
  let fixture: ComponentFixture<ScanComponentMentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanComponentMentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanComponentMentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
