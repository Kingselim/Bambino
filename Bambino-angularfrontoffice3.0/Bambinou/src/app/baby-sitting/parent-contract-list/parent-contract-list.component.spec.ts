import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentContractListComponent } from './parent-contract-list.component';

describe('ParentContractListComponent', () => {
  let component: ParentContractListComponent;
  let fixture: ComponentFixture<ParentContractListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentContractListComponent]
    });
    fixture = TestBed.createComponent(ParentContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
