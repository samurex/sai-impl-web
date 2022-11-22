import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavbarComponent} from "./views/navbar/navbar.component";
import {LoginComponent} from "./components/login/login.component";
import {MatCardModule} from "@angular/material/card";
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENV } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {Effects} from "./effects";
import {MatIconModule} from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { RedirectHandlerComponent } from './components/redirect-handler/redirect-handler.component';
import {SolidClient} from "./utils/solid-client";
import { AuthorizationComponent } from './components/authorization/authorization.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StartComponent } from './components/start/start.component';
import { ConnectServerComponent } from './components/connect-server/connect-server.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddSocialAgentComponent } from './components/add-social-agent/add-social-agent.component';
import { SocialAgentsComponent } from './components/social-agents/social-agents.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { DataComponent } from './components/data/data.component';
import { LanguageComponent } from './views/language/language.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    RedirectHandlerComponent,
    AuthorizationComponent,
    StartComponent,
    ConnectServerComponent,
    AddSocialAgentComponent,
    SocialAgentsComponent,
    ApplicationsComponent,
    DataComponent,
    LanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: ENV.production }),
    EffectsModule.forRoot(Effects),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: ENV.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    SolidClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
