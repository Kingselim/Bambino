import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverDetailsDialogComponent } from './hover-details-dialog.component';

describe('HoverDetailsDialogComponent', () => {
  let component: HoverDetailsDialogComponent;
  let fixture: ComponentFixture<HoverDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoverDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(HoverDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
