import { NgModule } from '@angular/core';
import { FormsComponent } from './forms/forms.component';
import {RouterModule} from "@angular/router";
import {BulletinComponent} from "../bulletin/bulletin.component";
import {SharedModule} from "../../utils/shared.module";



@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: BulletinComponent}]),
    SharedModule
  ],
  declarations: [
    BulletinComponent,
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
export class BulletinModule { }
