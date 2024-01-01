import { UserDto } from 'src/app/components/auth/models/userDto';
import { ProductDto } from './productDto';

export interface ReviewDto {
  id?: string;
  productId: string;
  product?: ProductDto;
  userId?: string;
  user?: UserDto;
  rating?: number;
  title?: string;
  comment?: string;
  createdAt?: Date;
  UpdatedAt?: Date;
}
