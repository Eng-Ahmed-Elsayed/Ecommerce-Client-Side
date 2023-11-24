import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { ErrorPagesComponent } from './error-pages.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonModule } from 'primeng/button';
import { ErrorTemplateComponent } from './error-template/error-template.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { InternalServerComponent } from './internal-server/internal-server.component';

@NgModule({
  declarations: [ErrorPagesComponent, ForbiddenComponent, NotFoundComponent, ErrorTemplateComponent, UnauthorizedComponent, BadRequestComponent, InternalServerComponent],
  imports: [CommonModule, ErrorPagesRoutingModule, ButtonModule],
})
export class ErrorPagesModule {}
