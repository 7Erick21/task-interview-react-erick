export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
}

export interface Cart {
  items: Product[];
  totalPrice: number;
  totalItems: number;
}
