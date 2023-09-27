import { CategoryDto } from './categoryDto';
import { ColorDto } from './colorsDto';
import { DiscountDto } from './discountDto';
import { InventoryDto } from './inventoryDto';
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
  categoryId?: string;
  category?: CategoryDto;
  inventoryId?: string;
  inventory?: InventoryDto;
  discountId?: string;
  discount?: DiscountDto;
}
