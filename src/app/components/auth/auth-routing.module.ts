import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendEmailConfirmationComponent } from './send-email-confirmation/send-email-confirmation.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {
  getUserDataResolver,
  notAuthenticatedGuard,
  userAuthenticatedGuard,
} from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'send-email-confirmation',
    component: SendEmailConfirmationComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'two-step-verification',
    component: TwoStepVerificationComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [userAuthenticatedGuard],
    resolve: { user: getUserDataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
