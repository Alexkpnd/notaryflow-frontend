import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsList } from './contracts-list';

describe('ContractsList', () => {
  let component: ContractsList;
  let fixture: ComponentFixture<ContractsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
