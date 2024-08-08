import { create } from 'zustand';
import { LisProductsResponse } from '../toolbox';

interface ProductsStoreProps {
  products: LisProductsResponse;
  newProduct: (
    newProducts: LisProductsResponse,
    searchProduct?: string,
    filterCategory?: string
  ) => void;
  searchProduct?: string;
  filterCategory?: string;
}

export const useProductsStore = create<ProductsStoreProps>((set) => ({
  products: { hasMore: false, products: [], total: 0, page: 1 },
  newProduct: (newProducts, searchProduct, filterCategory) =>
    set({ products: newProducts, searchProduct, filterCategory }),
}));
