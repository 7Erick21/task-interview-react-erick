import { create } from 'zustand';
import { Cart } from '../toolbox';
import { persist } from 'zustand/middleware';

interface CarsStoreProps {
  carts: Cart;
  setCarts: (newCarts: Cart) => void;
}

export const useCarsStore = create(
  persist<CarsStoreProps>(
    (set) => ({
      carts: { items: [], totalItems: 0, totalPrice: 0 },
      setCarts: (newCarts) => set({ carts: newCarts }),
    }),
    { name: 'carts-store' }
  )
);
