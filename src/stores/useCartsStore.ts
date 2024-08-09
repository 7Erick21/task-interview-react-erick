import { create } from 'zustand';
import { Cart, Product } from '../toolbox';
import { useProductsStore } from './useProductsStore';

interface CarsStoreProps {
  carts: Cart;
  setCarts: (product: Product, quantity: number) => void;
  removeItem: (carts: Cart) => void;
}

export const useCarsStore = create<CarsStoreProps>((set, get) => ({
  carts: { items: [], totalItems: 0, totalPrice: 0 },
  setCarts: (product, quantity) => {
    const newProducts = useProductsStore
      .getState()
      .products.products.map((productStore) => {
        if (product.id === productStore.id) {
          const newCarts = {
            items: [
              ...get().carts.items,
              {
                ...product,
                itemInCart: product.itemInCart + quantity,
              },
            ],
            totalItems: get().carts.totalItems + quantity,
            totalPrice:
              quantity > 0
                ? get().carts.totalPrice + product.price
                : get().carts.totalPrice - product.price,
          };

          const uniqueItems = newCarts.items.reduce((acc, item) => {
            const existingItemIndex = acc.findIndex(
              (i) =>
                i.id === item.id &&
                i.name === item.name &&
                i.imageUrl === item.imageUrl &&
                i.price === item.price &&
                i.category === item.category
            );

            if (existingItemIndex !== -1) {
              acc[existingItemIndex] = { ...item };
            } else {
              acc.push({ ...item });
            }

            return acc;
          }, [] as Product[]);

          const filterItemsCarts = uniqueItems.filter(
            (items) => items.itemInCart !== 0
          );

          set({ carts: { ...newCarts, items: filterItemsCarts } });

          return {
            ...productStore,
            itemInCart: (productStore.itemInCart ?? 0) + quantity,
          };
        }
        return productStore;
      });

    useProductsStore.getState().newProduct({
      ...useProductsStore.getState().products,
      products: newProducts,
    });
  },
  removeItem: (newCarts) => {
    const uniqueItems = newCarts.items.reduce((acc, item) => {
      const existingItem = acc.find(
        (i) =>
          i.id === item.id &&
          i.name === item.name &&
          i.imageUrl === item.imageUrl &&
          i.price === item.price &&
          i.category === item.category
      );

      if (existingItem) {
        existingItem.itemInCart = Math.max(
          existingItem.itemInCart,
          item.itemInCart
        );
      } else {
        acc.push({ ...item });
      }

      return acc;
    }, [] as Product[]);

    const filterItemsCarts = uniqueItems.filter(
      (items) => items.itemInCart !== 0
    );

    set({ carts: { ...newCarts, items: filterItemsCarts } });
  },
}));
