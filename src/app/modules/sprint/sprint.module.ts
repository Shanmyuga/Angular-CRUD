import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import {RouterModule} from "@angular/router";
import {SprintComponent} from "../sprint/sprint.component";
import {SharedModule} from "../../utils/shared.module";



@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: SprintComponent}]),
    SharedModule
  ],
  declarations: [
    SprintComponent,
    FormsComponent


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
