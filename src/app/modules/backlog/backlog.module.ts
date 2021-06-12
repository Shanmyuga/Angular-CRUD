import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { SelectCheckAllComponent } from './select-check-all/select-check-all.component';
import {RouterModule} from "@angular/router";
import {BacklogComponent} from "../backlog/backlog.component";
import {SharedModule} from "../../utils/shared.module";



@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: BacklogComponent}]),
    SharedModule
  ],
  declarations: [
    BacklogComponent,
    FormsComponent,
    SelectCheckAllComponent

  ],
  providers: [],
  entryComponents: [
    FormsComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class BacklogModule { }
