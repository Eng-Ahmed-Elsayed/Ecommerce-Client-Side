import { CheckListItemDto } from './checkListItemDto';

export interface CheckListDto {
  id?: string;
  userId?: string;
  checkListItems?: CheckListItemDto[];
}
