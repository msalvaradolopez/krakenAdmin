import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopendientesComponent } from './autopendientes.component';

describe('AutopendientesComponent', () => {
  let component: AutopendientesComponent;
  let fixture: ComponentFixture<AutopendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutopendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutopendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
