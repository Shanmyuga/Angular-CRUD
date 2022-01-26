import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import {RouterModule} from "@angular/router";
import {BulletinComponent} from "../bulletin/bulletin.component";
import {SharedModule} from "../../utils/shared.module";
import { AckformComponent } from './ackform/ackform.component';
import { AckCommentsComponent } from './ackcomments/ackcomments.component';



@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: BulletinComponent}]),
    SharedModule
  ],
  declarations: [
    BulletinComponent,
    FormsComponent,
    AckformComponent,
    AckCommentsComponent,
  ],
  providers: [],
  entryComponents: [
    FormsComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class BulletinModule { }
