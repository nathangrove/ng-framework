import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { appRouting } from './app.routing';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";


// guards
import { AuthGuard } from './shared/services/auth.guard';

// pipes
import { GenericFieldPipe } from './shared/pipes/generic-field.pipe';

// services
import { AuthenticationService } from './shared/services/auth.service';
import { HttpClient } from './shared/services/http.service';
import { GenericService } from './generic/generic.service';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GenericListComponent } from './generic/list/list.component';
import { GenericWriteComponent } from './generic/write/write.component';
import { MenuComponent } from './menu/menu.component';

// import { EventService } from './event/event.service';
// import { EventListComponent } from './event/list/list.component';
// import { EventEditComponent } from './event/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    // EventListComponent,
    // EventEditComponent,
    NotFoundComponent,
    GenericListComponent,
    GenericFieldPipe,
    GenericWriteComponent,
    MenuComponent
  ],
  imports: [
    appRouting,
    BrowserModule,
    SchemaFormModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
    GenericService,
    // EventService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
