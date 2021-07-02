import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~utils/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardModule } from '~modules/dashboard/dashboard.module';
import { ClientModule } from '~modules/client/client.module';
import { EpicModule } from '~modules/epic/epic.module';
import { BacklogModule } from '~modules/backlog/backlog.module';
import {SprintModule} from "~modules/sprint/sprint.module";
import {BulletinModule} from "~modules/bulletin/bulletin.module";
@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    DashboardModule,
    ClientModule,
    EpicModule,
    BacklogModule,
    SprintModule,
    BulletinModule
  ],
  declarations: [
    AdminLayoutComponent
  ],
  providers: [],
  exports: []
})
export class AdminLayoutModule {
}
