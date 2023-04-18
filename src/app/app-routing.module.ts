import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { ConnectServerPage } from './pages/connect-server/connect-server.page';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StartGuard } from './guards/start.guard';
import { AuthGuard } from './guards/auth.guard.service';
import { RedirectHandlerComponent } from './pages/redirect-handler/redirect-handler.component';
import { AuthorizationPage } from './pages/authorization/authorization.page';
import { AddSocialAgentComponent } from './pages/add-social-agent/add-social-agent.component';
import { SocialAgentsComponent } from './pages/social-agents/social-agents.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { DataComponent } from './pages/data/data.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPage } from './pages/login/login.page';
import { ApplicationComponent } from './pages/application/application.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [StartGuard],
    children: [
      {
        path: 'start',
        component: StartComponent,
      },
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'redirect',
        component: RedirectHandlerComponent,
      },
      {
        path: 'connect',
        component: ConnectServerPage,
      },
    ],
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'authorize',
        component: AuthorizationPage,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        children: [
          {
            path: 'application',
            component: ApplicationComponent,
          },
        ],
      },
      {
        path: 'application',
        component: ApplicationComponent,
      },
      {
        path: 'social-agents',
        component: SocialAgentsComponent,
      },
      {
        path: 'add-social-agent',
        component: AddSocialAgentComponent,
      },
      {
        path: 'data',
        component: DataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TranslateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
