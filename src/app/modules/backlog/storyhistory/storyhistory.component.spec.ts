import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryhistoryComponent } from './storyhistory.component';

describe('StoryhistoryComponent', () => {
  let component: StoryhistoryComponent;
  let fixture: ComponentFixture<StoryhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
