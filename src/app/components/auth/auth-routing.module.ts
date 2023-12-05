import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditUserComponent } from './edit-user/edit-user.component';
import {
  getUserDataResolver,
  notAuthenticatedGuard,
  userAuthenticatedGuard,
} from 'src/app/shared/guards/auth.guard';
import { LoginV2Component } from './login-v2/login-v2.component';
import { EmailConfirmationV2Component } from './email-confirmation-v2/email-confirmation-v2.component';
import { RegisterV2Component } from './register-v2/register-v2.component';
import { SendEmailConfirmationV2Component } from './send-email-confirmation-v2/send-email-confirmation-v2.component';
import { TwoStepVerificationV2Component } from './two-step-verification-v2/two-step-verification-v2.component';
import { ForgotPasswordV2Component } from './forgot-password-v2/forgot-password-v2.component';
import { RestPasswordV2Component } from './rest-password-v2/rest-password-v2.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'send-email-confirmation',
    component: SendEmailConfirmationV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'two-step-verification',
    component: TwoStepVerificationV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordV2Component,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'reset-password',
    component: RestPasswordV2Component,
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
