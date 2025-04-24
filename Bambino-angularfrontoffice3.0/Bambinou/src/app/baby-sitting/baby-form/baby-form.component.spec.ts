import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyFormComponent } from './baby-form.component';

describe('BabyFormComponent', () => {
  let component: BabyFormComponent;
  let fixture: ComponentFixture<BabyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabyFormComponent]
    });
    fixture = TestBed.createComponent(BabyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
