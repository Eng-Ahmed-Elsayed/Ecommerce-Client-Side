import { ProductDto } from '../shared/productDto';

export interface CheckListItemDto {
  id?: string;
  checkListId?: string;
  productId?: string;
  product?: ProductDto;
}
