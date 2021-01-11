import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidospreciosComponent } from './pedidosprecios.component';

describe('PedidospreciosComponent', () => {
  let component: PedidospreciosComponent;
  let fixture: ComponentFixture<PedidospreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidospreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidospreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
