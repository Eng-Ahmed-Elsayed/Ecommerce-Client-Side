import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CheckListItemDto } from '../models/customer/checkListItemDto';
import { inject } from '@angular/core';
import { CustomerService } from '../services/customer.service';

export const getWatchListItemsResolver: ResolveFn<
  Observable<CheckListItemDto[]>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CustomerService).checkListReview();
};
