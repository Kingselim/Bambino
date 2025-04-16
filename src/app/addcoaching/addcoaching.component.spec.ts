import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoachingComponent } from './addcoaching.component';

describe('AddcoachingComponent', () => {
  let component: AddcoachingComponent;
  let fixture: ComponentFixture<AddcoachingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcoachingComponent]
    });
    fixture = TestBed.createComponent(AddcoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
