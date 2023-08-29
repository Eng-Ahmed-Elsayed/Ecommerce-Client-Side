import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExternalProvidersComponent } from './external-providers/external-providers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

// Get the token
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ExternalProvidersComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7021'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
  ],
})
export class AuthModule {}
