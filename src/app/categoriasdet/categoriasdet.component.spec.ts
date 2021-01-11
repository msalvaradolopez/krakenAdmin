import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasdetComponent } from './categoriasdet.component';

describe('CategoriasdetComponent', () => {
  let component: CategoriasdetComponent;
  let fixture: ComponentFixture<CategoriasdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
