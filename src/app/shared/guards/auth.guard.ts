import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/components/auth/models/userDto';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authState: boolean = inject(AuthService).isUserAuthenticated();
  if (authState) {
    return true;
  }
  inject(Router).navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};

export const notAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authState: boolean = inject(AuthService).isUserAuthenticated();
  if (!authState) {
    return true;
  }
  inject(Router).navigate(['/home']);
  return false;
};

export const isUserAdminGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).getUserRole() === 'Administrator';
};

export const getUserDataResolver: ResolveFn<Observable<UserDto>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).getUser();
};
