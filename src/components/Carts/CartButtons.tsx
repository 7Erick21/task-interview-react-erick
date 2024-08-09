import { Add, DeleteOutline, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Product } from '../../toolbox';
import { useCarsStore, useProductsStore } from '../../stores';

interface CartButtonsProps {
  product: Product;
  disabled: boolean;
}

export const CartButtons: FC<CartButtonsProps> = ({ product, disabled }) => {
  const { setCarts, carts, removeItem } = useCarsStore();
  const { newProduct, products } = useProductsStore();

  const [productDetail, setProductDetail] = useState<Product>(product);

  const { id, itemInCart, price } = productDetail;

  const handleAddCart = (quantity: number) => {
    const newProducts = products.products.map((productStore) => {
      if (product.id === productStore.id) {
        setCarts(product, quantity);

        setProductDetail({
          ...productStore,
          itemInCart: (productStore.itemInCart ?? 0) + quantity,
        });
        return {
          ...productStore,
          itemInCart: (productStore.itemInCart ?? 0) + quantity,
        };
      }
      return productStore;
    });

    newProduct({ ...products, products: newProducts });
  };

  const handleRemoveProduct = () => {
    const newProducts = products.products.map((product) => {
      if (productDetail.id === product.id) return { ...product, itemInCart: 0 };
      return product;
    });

    newProduct({ ...products, products: newProducts });

    removeItem({
      totalItems: carts.totalItems - 1,
      totalPrice: carts.totalPrice - itemInCart * price,
      items: carts.items.filter((item) => item.id !== id),
    });
  };

  return (
    <Box
      position='relative'
      display='flex'
      flexDirection='row'
      alignItems='center'
    >
      <IconButton
        disabled={itemInCart === 0 || disabled}
        aria-label='delete'
        size='small'
        onClick={() => handleAddCart(-1)}
      >
        <Remove fontSize='small' />
      </IconButton>

      <Typography variant='body1' component='div' mx={1}>
        {itemInCart}
      </Typography>

      <IconButton
        aria-label='add'
        disabled={disabled}
        size='small'
        onClick={() => handleAddCart(1)}
      >
        <Add fontSize='small' />
      </IconButton>

      <IconButton
        aria-label='add'
        size='small'
        disabled={disabled}
        onClick={handleRemoveProduct}
      >
        <DeleteOutline fontSize='small' />
      </IconButton>
    </Box>
  );
};
