import { ReactiveFormsDemoComponent } from './components/reactive-forms-demo/reactive-forms-demo.component';
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
import { HighlightTestComponent } from './components/highlight-test/highlight-test.component';
import { PipeDemoComponent } from './components/pipe-demo/pipe-demo.component';
import { DirectiveDemoComponent } from './components/directive-demo/directive-demo.component';
import { FormSubmitOnKeypressComponent } from './components/form-submit-on-keypress/form-submit-on-keypress.component';
import { NgxFormValidationComponent } from './components/ngx-form-validation/ngx-form-validation.component';

import { AuthGuard } from './services/auth.guard';
import { MenuArrowComponent } from './components/menu-arrow/menu-arrow.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { NewsletterModalComponent } from './pages/newsletter-modal/newsletter-modal.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'highlight-test', component:HighlightTestComponent, canActivate: [AuthGuard] },
  {path: 'pipe-demo', component: PipeDemoComponent, canActivate: [AuthGuard] },
  {path: 'directive-demo', component: DirectiveDemoComponent, canActivate: [AuthGuard] },
  {path: 'submit-keypress', component: FormSubmitOnKeypressComponent, canActivate: [AuthGuard] },
  {path: 'reactive-form', component: ReactiveFormsDemoComponent, canActivate: [AuthGuard] },
  {path: 'ngx-form-validation', component: NgxFormValidationComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'verify-email', component: VerifyEmailComponent },
  {path: 'menu-arrow', component: MenuArrowComponent },
  {path: 'newsletter', component: NewsletterComponent },
  {path: 'newsletter-modal', component: NewsletterModalComponent },
  {path: '**', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
