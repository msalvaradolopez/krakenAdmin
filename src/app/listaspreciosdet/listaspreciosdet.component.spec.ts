import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaspreciosdetComponent } from './listaspreciosdet.component';

describe('ListaspreciosdetComponent', () => {
  let component: ListaspreciosdetComponent;
  let fixture: ComponentFixture<ListaspreciosdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaspreciosdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaspreciosdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
