import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoscuentaComponent } from './pedidoscuenta.component';

describe('PedidoscuentaComponent', () => {
  let component: PedidoscuentaComponent;
  let fixture: ComponentFixture<PedidoscuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoscuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoscuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
