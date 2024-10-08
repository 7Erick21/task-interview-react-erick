import { useMutation } from '@tanstack/react-query';
import {
  filterEmptyValues,
  LisProductsRequest,
  LisProductsResponse,
  Product,
} from '../toolbox';
import queryString from 'query-string';
import { useCarsStore, useProductsStore } from '../stores';

export const useListProducts = () => {
  const { carts } = useCarsStore();
  const { newProduct } = useProductsStore();

  return useMutation({
    mutationFn: async (
      params: LisProductsRequest
    ): Promise<LisProductsResponse> => {
      const queryParams = queryString.stringify(
        filterEmptyValues({
          ...params,
        })
      );

      return await fetch(`/products?${queryParams}`).then((response) =>
        response.json()
      );
    },
    onSuccess: (resp, { category, q, page, isPagination }) => {
      const newProductsArray: Product[] = resp.products.map((product) => {
        const cartProduct = carts.items.find((item) => item.id === product.id);
        if (cartProduct) {
          return { ...product, itemInCart: cartProduct.itemInCart };
        }
        return { ...product, itemInCart: 0 };
      });

      if (!isPagination)
        newProduct(
          {
            ...resp,
            page: page + 1,
            products: newProductsArray,
          },
          q,
          category
        );
    },
  });
};
