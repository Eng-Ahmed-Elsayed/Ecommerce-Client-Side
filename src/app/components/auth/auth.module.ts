import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExternalProvidersComponent } from './external-providers/external-providers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendEmailConfirmationComponent } from './send-email-confirmation/send-email-confirmation.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { LoginV2Component } from './login-v2/login-v2.component';
import { RegisterV2Component } from './register-v2/register-v2.component';
import { EmailConfirmationV2Component } from './email-confirmation-v2/email-confirmation-v2.component';
import { ForgotPasswordV2Component } from './forgot-password-v2/forgot-password-v2.component';
import { RestPasswordV2Component } from './rest-password-v2/rest-password-v2.component';
import { SendEmailConfirmationV2Component } from './send-email-confirmation-v2/send-email-confirmation-v2.component';
import { CheckboxModule } from 'primeng/checkbox';
import { TwoStepVerificationV2Component } from './two-step-verification-v2/two-step-verification-v2.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ExternalProvidersComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SendEmailConfirmationComponent,
    TwoStepVerificationComponent,
    EditUserComponent,
    LoginV2Component,
    RegisterV2Component,
    EmailConfirmationV2Component,
    ForgotPasswordV2Component,
    RestPasswordV2Component,
    SendEmailConfirmationV2Component,
    TwoStepVerificationV2Component,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FileUploadModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    PasswordModule,
    CustomComponentsModule,
    CheckboxModule,
  ],
  providers: [],
})
export class AuthModule {}
