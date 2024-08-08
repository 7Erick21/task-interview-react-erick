import { useMutation } from '@tanstack/react-query';
import {
  AddCartsRequest,
  AddCartsResponse,
  EMutationKeys,
  Product,
} from '../toolbox';
import { useCarsStore, useProductsStore } from '../stores';

export const useListCarts = () => {};

export const useAddCarts = () => {
  const { carts, setCarts } = useCarsStore();
  const { newProduct, products } = useProductsStore();

  return useMutation({
    mutationKey: [EMutationKeys.MUTATIO_KEY_CARTS],
    mutationFn: async ({
      productId,
      quantity,
    }: AddCartsRequest): Promise<AddCartsResponse> => {
      return await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      }).then((response) => response.json());
    },
    onSuccess: (resp, { productId, quantity }) => {
      if (products) {
        const newProducts = products.products.map((product): Product => {
          if (product.id === productId) {
            setCarts({
              items: [
                ...carts.items,
                {
                  ...product,
                  itemInCart: product.itemInCart + quantity,
                },
              ],
              totalItems: carts.totalItems + quantity,
              totalPrice: carts.totalPrice + product.price,
            });

            const findCarts = resp.items.find(
              (item) => item.product.id === productId
            );
            if (findCarts) {
              return {
                ...product,
                itemInCart: findCarts.quantity,
              };
            }

            return {
              ...product,
              itemInCart: 0,
            };
          }
          return product;
        });

        newProduct({ ...products, products: newProducts });
      }
    },
  });
};
