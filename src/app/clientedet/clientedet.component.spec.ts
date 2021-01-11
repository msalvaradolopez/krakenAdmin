import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientedetComponent } from './clientedet.component';

describe('ClientedetComponent', () => {
  let component: ClientedetComponent;
  let fixture: ComponentFixture<ClientedetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientedetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientedetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
