import { UserDto } from 'src/app/components/auth/models/userDto';

export interface UserPaymentDto {
  id?: string;
  userId?: string;
  user?: UserDto;
  provider?: string;
  name?: string;
  accountNo?: string;
  expiry?: string;
  cvv?: number;
  remember?: boolean;
}
