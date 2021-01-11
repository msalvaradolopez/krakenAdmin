import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidodetComponent } from './pedidodet.component';

describe('PedidodetComponent', () => {
  let component: PedidodetComponent;
  let fixture: ComponentFixture<PedidodetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidodetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidodetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
