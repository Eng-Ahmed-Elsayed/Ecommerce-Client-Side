import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';
import { ProductDto } from '../models/productDto';

// Product Resolver Guards
export const getProductListResolver: ResolveFn<Observable<ProductDto[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProductService).getProductList();
};

export const getProductResolver: ResolveFn<Observable<ProductDto>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProductService).getProduct(route.paramMap.get('id')!);
};
