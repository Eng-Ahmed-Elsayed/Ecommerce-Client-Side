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
import { DiscountDto } from 'src/app/shared/models/discountDto';
import { ProductDto } from 'src/app/shared/models/productDto';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// Category guards
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

// Discount guards
export const getDiscountResolver: ResolveFn<Observable<DiscountDto>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminService).getDiscount(route.paramMap.get('id')!);
};

// Product Resolver Guards
export const getProductListResolver: ResolveFn<Observable<ProductDto[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminService).getProductList();
};

export const getProductResolver: ResolveFn<Observable<ProductDto>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminService).getProduct(route.paramMap.get('id')!);
};
