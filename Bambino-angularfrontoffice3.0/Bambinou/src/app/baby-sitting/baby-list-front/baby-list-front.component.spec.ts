import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyListFrontComponent } from './baby-list-front.component';

describe('BabyListFrontComponent', () => {
  let component: BabyListFrontComponent;
  let fixture: ComponentFixture<BabyListFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabyListFrontComponent]
    });
    fixture = TestBed.createComponent(BabyListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
