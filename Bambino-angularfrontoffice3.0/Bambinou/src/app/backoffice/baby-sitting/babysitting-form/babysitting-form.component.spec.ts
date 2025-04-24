import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysittingFormComponent } from './babysitting-form.component';

describe('BabysittingFormComponent', () => {
  let component: BabysittingFormComponent;
  let fixture: ComponentFixture<BabysittingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysittingFormComponent]
    });
    fixture = TestBed.createComponent(BabysittingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
