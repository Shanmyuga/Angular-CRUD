import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import {RouterModule} from "@angular/router";
import {SprintComponent} from "../sprint/sprint.component";
import {SharedModule} from "../../utils/shared.module";
import { StorycommentsComponent } from './storycomments/storycomments.component';



@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: SprintComponent}]),
    SharedModule
  ],
  declarations: [
    SprintComponent,
    FormsComponent,
    StorycommentsComponent,


  ],
  providers: [],
  entryComponents: [
    FormsComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class SprintModule { }
