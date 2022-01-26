import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorycommentsComponent } from './storycomments.component';

describe('StorycommentsComponent', () => {
  let component: StorycommentsComponent;
  let fixture: ComponentFixture<StorycommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorycommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
