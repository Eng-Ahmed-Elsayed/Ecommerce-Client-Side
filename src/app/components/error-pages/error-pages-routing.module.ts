import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InternalServerComponent } from './internal-server/internal-server.component';

const routes: Routes = [
  { path: '404', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'bad-request', component: BadRequestComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '500', component: InternalServerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
