import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaspreciosComponent } from './listasprecios.component';

describe('ListaspreciosComponent', () => {
  let component: ListaspreciosComponent;
  let fixture: ComponentFixture<ListaspreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaspreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaspreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
