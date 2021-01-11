import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutohistoricoComponent } from './autohistorico.component';

describe('AutohistoricoComponent', () => {
  let component: AutohistoricoComponent;
  let fixture: ComponentFixture<AutohistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutohistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutohistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
