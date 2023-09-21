import { ColorDto } from './colorsDto';
import { ProductImage } from './productImageDto';
import { TagDto } from './tagDto';

export interface ProductDto {
  id?: string;
  name?: string;
  description?: string;
  productCode?: string;
  productSKU?: string;
  price?: number;
  rating?: number;
  status?: string;
  inStock?: boolean;
  tags?: TagDto[];
  colors?: ColorDto[];
  productImages?: ProductImage[];
  quantity?: number;
  // discountValue?: number;
  categoryId?: string;
  inventoryId?: string;
  discountId?: string;
}
