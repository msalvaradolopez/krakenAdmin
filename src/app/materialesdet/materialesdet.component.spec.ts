import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesdetComponent } from './materialesdet.component';

describe('MaterialesdetComponent', () => {
  let component: MaterialesdetComponent;
  let fixture: ComponentFixture<MaterialesdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialesdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
