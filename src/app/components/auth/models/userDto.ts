export interface UserDto {
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  birthdate?: Date;
  imgPath?: string;
  twoFactorEnabled?: boolean;
}
