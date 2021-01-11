import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosventaComponent } from './preciosventa.component';

describe('PreciosventaComponent', () => {
  let component: PreciosventaComponent;
  let fixture: ComponentFixture<PreciosventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciosventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
