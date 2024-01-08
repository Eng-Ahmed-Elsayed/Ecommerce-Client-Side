import { ProductDto } from './productDto';

export interface UpsertFeatureProductsDto {
  featureProducts?: ProductDto[];
  otherProducts?: ProductDto[];
}
