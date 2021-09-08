import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/*ESTE ARCHIVO CONTIENE IMPORTACIONES QUE ESTAN EN TODOS LOS MODULOS
PARA AHORRARSE LINEAS SE IMPORTAN EN EL Y LUEGO EL ARCHIVO SE IMPORTA
EN TODOS LOS MODULOS*/
import { SharedModule } from '~utils/shared.module';

// IMPORTACION DEL MODULO DE RUTAS
import { AppRoutingModule } from '~app/app.routes';

// IMPORTACION DE LOS GUARDS
import { AuthGuard } from '~guards/auth.guard';

// COMPONENTS
import { AppComponent } from '~components/app/app.component';
import { TablesComponent } from '~components/tables/tables.component';
import { ContactUsComponent } from '~components/contact-us/contact-us.component';
import { NotFoundComponent } from '~components/not-found/not-found.component';
import { ConfirmComponent } from '~components/confirm/confirm.component';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';

// IMPORTACIÓN DE LOS SERVICES
import { AuthService } from '~services/auth.service';
import { UserService } from '~services/user.service';
import { ClientService } from '~app/services/client.service';
import { EpicService } from '~app/services/epic.service';
/*IMPORTACION DE LOS MODULES QUE A SU VEZ ELLOS IMPORTAN SUS PROPIOS COMPONENTES
ASI SE EVITA SATURAR ESTE ARCHIVO DE IMPORTACIONES Y SE MODULARIZA EL PROYECTO.*/
import { UserModule } from '~modules/user/user.module';
import { AdminLayoutModule } from '~modules/admin-layout/admin-layout.module';
import { LoginLayoutModule } from '~modules/login-layout/login-layout.module';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import {BacklogService} from "~services/backlog.service";
import {SprintService} from "~services/sprint.service";
import {BulletinService} from "~services/bulletin.service";
import { SAVER, getSaver } from '~services/saver.provider'

@NgModule({
  declarations: [ /*DECLARACIÓN DE COMPONENTES*/
    AppComponent,
    TablesComponent,
    ContactUsComponent,
    NotFoundComponent,
    ConfirmComponent,
    SnackbarComponent,
    AutocompleteComponent



  ],
  imports: [ /*DECLARACIÓN DE MODULOS*/
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminLayoutModule,
    LoginLayoutModule,
    UserModule,
  ],
  providers: [ /*DECLARACIÓN DE SERVICIOS*/
    AuthGuard,
    AuthService,
    UserService,
    ClientService,
    EpicService,
    BacklogService,
    SprintService,
    BulletinService,
    {provide: SAVER, useFactory: getSaver}
  ],
  entryComponents: [ /*AQUI SE AGREGAN LOS MAT-CONFIRM Y LOS MAT-SNACKBAR DE ANGULAR MATERIAL*/
    ConfirmComponent,
    SnackbarComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
