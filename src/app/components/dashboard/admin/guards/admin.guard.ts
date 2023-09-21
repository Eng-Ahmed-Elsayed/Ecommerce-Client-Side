import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categoryDto';
import { AdminService } from '../services/admin.service';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const getCategoryResolver: ResolveFn<Observable<CategoryDto>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminService).getCategory(route.paramMap.get('id')!);
};

export const getCategoryListResolver: ResolveFn<Observable<CategoryDto[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminService).getCategoryList();
};
