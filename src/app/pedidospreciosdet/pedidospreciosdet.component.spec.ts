import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidospreciosdetComponent } from './pedidospreciosdet.component';

describe('PedidospreciosdetComponent', () => {
  let component: PedidospreciosdetComponent;
  let fixture: ComponentFixture<PedidospreciosdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidospreciosdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidospreciosdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
