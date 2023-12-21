import { CategoryDto } from './categoryDto';
import { ColorDto } from './colorDto';
import { DiscountDto } from './discountDto';
import { InventoryDto } from './inventoryDto';
import { ProductImage } from './productImageDto';
import { SizeDto } from './sizeDto';
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
  sizes?: SizeDto[];
  productImages?: ProductImage[];
  discounts?: DiscountDto[];
  // Save the old price to display it with the new price
  priceBeforeDiscount?: number;
  // Used in upsert porduct
  quantity?: number;
  categoryId?: string;
  category?: CategoryDto;
  inventoryId?: string;
  inventory?: InventoryDto;
  isInCheckList?: boolean;
}
