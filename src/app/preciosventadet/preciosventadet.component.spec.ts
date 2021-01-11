import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosventadetComponent } from './preciosventadet.component';

describe('PreciosventadetComponent', () => {
  let component: PreciosventadetComponent;
  let fixture: ComponentFixture<PreciosventadetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciosventadetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciosventadetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
