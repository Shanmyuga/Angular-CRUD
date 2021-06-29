import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicworkComponent } from './epicwork.component';

describe('EpicworkComponent', () => {
  let component: EpicworkComponent;
  let fixture: ComponentFixture<EpicworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
