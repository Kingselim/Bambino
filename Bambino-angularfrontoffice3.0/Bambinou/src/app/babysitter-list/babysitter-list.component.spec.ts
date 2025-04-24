import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabysitterListComponent } from './babysitter-list.component';

describe('BabysitterListComponent', () => {
  let component: BabysitterListComponent;
  let fixture: ComponentFixture<BabysitterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabysitterListComponent]
    });
    fixture = TestBed.createComponent(BabysitterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
