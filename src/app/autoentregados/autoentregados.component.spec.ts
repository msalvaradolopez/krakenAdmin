import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoentregadosComponent } from './autoentregados.component';

describe('AutoentregadosComponent', () => {
  let component: AutoentregadosComponent;
  let fixture: ComponentFixture<AutoentregadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoentregadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoentregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
