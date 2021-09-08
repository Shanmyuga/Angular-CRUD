import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckformComponent } from './ackform.component';

describe('AckformComponent', () => {
  let component: AckformComponent;
  let fixture: ComponentFixture<AckformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
