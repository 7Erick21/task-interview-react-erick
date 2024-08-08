import { Product } from './interface';

export interface LisProductsRequest {
  q?: string;
  category?: string;
  page: number;
  limit: number;
  isPagination?: boolean;
}

export interface LisProductsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  page: number;
}

export interface AddCartsRequest {
  productId: number;
  quantity: number;
}

interface ItemsCarts {
  product: Omit<Product, 'itemInCart'>;
  quantity: number;
}

export interface AddCartsResponse {
  items: ItemsCarts[];
  totalPrice: number;
  totalItems: number;
}
