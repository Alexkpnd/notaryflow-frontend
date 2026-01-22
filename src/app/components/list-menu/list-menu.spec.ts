import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenu } from './list-menu';

describe('ListMenu', () => {
  let component: ListMenu;
  let fixture: ComponentFixture<ListMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
