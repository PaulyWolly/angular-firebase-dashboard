import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
//import { ConverterPipeComponent } from './components/converter-pipe/converter-pipe.component';
import { HighlightTestComponent } from './components/highlight-test/highlight-test.component';
import { PipeDemoComponent } from './components/pipe-demo/pipe-demo.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  {path: 'highlight-test', component:HighlightTestComponent},
  //,{path: 'converter-pipe', component: ConverterPipeComponent},
  {path: 'pipe-demo', component: PipeDemoComponent},
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'verify-email', component: VerifyEmailComponent },
  {path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
