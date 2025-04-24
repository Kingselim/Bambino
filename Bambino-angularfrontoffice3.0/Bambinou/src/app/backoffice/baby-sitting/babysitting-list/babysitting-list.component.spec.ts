import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysittingListComponent } from './babysitting-list.component';

describe('BabysittingListComponent', () => {
  let component: BabysittingListComponent;
  let fixture: ComponentFixture<BabysittingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysittingListComponent]
    });
    fixture = TestBed.createComponent(BabysittingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
