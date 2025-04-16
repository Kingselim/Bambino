import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcoachingComponent } from './editcoaching.component';

describe('EditcoachingComponent', () => {
  let component: EditcoachingComponent;
  let fixture: ComponentFixture<EditcoachingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcoachingComponent]
    });
    fixture = TestBed.createComponent(EditcoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
