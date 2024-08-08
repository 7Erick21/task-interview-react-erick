import { create } from 'zustand';
import { Cart } from '../toolbox';

interface CarsStoreProps {
  carts: Cart;
  setCarts: (newCarts: Cart) => void;
}

export const useCarsStore = create<CarsStoreProps>((set) => ({
  carts: { items: [], totalItems: 0, totalPrice: 0 },
  setCarts: (newCarts) => set({ carts: newCarts }),
}));
