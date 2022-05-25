import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard.service";
import {RedirectHandlerComponent} from "./components/redirect-handler/redirect-handler.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'redirect', component: RedirectHandlerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
