import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomepicComponent } from './customepic.component';

describe('CustomepicComponent', () => {
  let component: CustomepicComponent;
  let fixture: ComponentFixture<CustomepicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomepicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
