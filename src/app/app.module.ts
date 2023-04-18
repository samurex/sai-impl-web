import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENV } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Effects } from './state/effects';
import { RedirectHandlerComponent } from './pages/redirect-handler/redirect-handler.component';
import { SolidClient } from './utils/solid-client';
import { AuthorizationPage } from './pages/authorization/authorization.page';
import { StartComponent } from './pages/start/start.component';
import { ConnectServerPage } from './pages/connect-server/connect-server.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddSocialAgentComponent } from './pages/add-social-agent/add-social-agent.component';
import { SocialAgentsComponent } from './pages/social-agents/social-agents.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { DataComponent } from './pages/data/data.component';
import { LanguageComponent } from './components/language/language.component';
import { AppViewComponent } from './components/app-view/app-view.component';
import { AddSocialAgentFormComponent } from './components/add-social-agent-form/add-social-agent-form.component';
import { I18nModule } from './i18n.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginPage } from './pages/login/login.page';
import {ApplicationComponent} from "./pages/application/application.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    RedirectHandlerComponent,
    AuthorizationPage,
    StartComponent,
    ConnectServerPage,
    AddSocialAgentComponent,
    SocialAgentsComponent,
    ApplicationsComponent,
    DataComponent,
    LanguageComponent,
    AppViewComponent,
    AddSocialAgentFormComponent,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: ENV.production }),
    EffectsModule.forRoot(Effects),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: ENV.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    I18nModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SolidClient,
  ],
  bootstrap: [AppComponent],
  exports: [BrowserModule],
})
export class AppModule {}
