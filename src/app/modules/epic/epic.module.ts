import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../utils/shared.module';

import { EpicComponent } from './epic.component';
import { FormsComponent } from './forms/forms.component';
import { SelectCheckAllComponent } from './select-check-all/select-check-all.component';
import { CustomepicComponent } from './customepic/customepic.component';
import { EpicworkComponent } from './epicwork/epicwork.component';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: EpicComponent}]),
    SharedModule
  ],
  declarations: [
    EpicComponent,
    FormsComponent,
    SelectCheckAllComponent,
    CustomepicComponent,
    EpicworkComponent
  ],
  providers: [],
  entryComponents: [
    FormsComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class EpicModule { }
