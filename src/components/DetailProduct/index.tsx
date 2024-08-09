import { FC, useState } from 'react';
import { Product } from '../../toolbox';
import { Typography, Box, IconButton, SxProps } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { useCarsStore, useProductsStore } from '../../stores';

interface DetailProductProps {
  product: Product;
}

const style: SxProps = {
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const DetailProduct: FC<DetailProductProps> = ({ product }) => {
  const { setCarts } = useCarsStore();

  const { newProduct, products } = useProductsStore();

  const [productDetail, setProductDetail] = useState<Product>(product);

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

  return (
    <Box sx={style}>
      <Box display='flex' flexWrap='wrap' gap={2} alignItems='flex-end'>
        <img src={productDetail.imageUrl} alt={productDetail.name} />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          flexGrow={1}
        >
          <Typography variant='h6' component='div' mb={2}>
            Categoria: {productDetail.category}
          </Typography>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography component='div'>${productDetail.price}</Typography>
            <Box flexGrow={1} />
            <Box
              position='relative'
              display='flex'
              flexDirection='row'
              alignItems='center'
            >
              <IconButton
                disabled={productDetail.itemInCart === 0}
                aria-label='delete'
                size='small'
                onClick={() => handleAddCart(-1)}
              >
                <RemoveIcon fontSize='small' />
              </IconButton>

              <Typography variant='body1' component='div' mx={1}>
                {productDetail.itemInCart}
              </Typography>

              <IconButton
                aria-label='add'
                size='small'
                onClick={() => handleAddCart(1)}
              >
                <AddIcon fontSize='small' />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
