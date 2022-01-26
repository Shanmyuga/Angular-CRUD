import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckcommentsComponent } from './ackcomments.component';

describe('AckcommentsComponent', () => {
  let component: AckcommentsComponent;
  let fixture: ComponentFixture<AckcommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckcommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
