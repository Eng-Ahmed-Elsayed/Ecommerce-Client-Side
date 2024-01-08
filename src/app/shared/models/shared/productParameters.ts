export interface ProductParameters {
  [key: string]: string | number | any; // index signature
  pageNumber: number;
  pageSize: number;
  name: string | null;
  availability: string[] | null;
  colors: string[] | null;
  sizes: string[] | null;
  minPrice: number | null;
  maxPrice: number | null;
  orderBy?: string | null;
  category?: string | null;
  featured?: boolean;
}
