import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isUserAdminGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [isUserAdminGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
