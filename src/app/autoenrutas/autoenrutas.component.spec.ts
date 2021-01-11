import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoenrutasComponent } from './autoenrutas.component';

describe('AutoenrutasComponent', () => {
  let component: AutoenrutasComponent;
  let fixture: ComponentFixture<AutoenrutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoenrutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoenrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
