import { ChangeEvent, FC, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import { Card } from '../../components/Card';
import { useAddCarts, useListProducts } from '../../hooks';
import { useProductsStore } from '../../stores';
import { pageSize } from '../../toolbox';

export const ListProducts: FC = () => {
  const { mutate: listProducts, isPending } = useListProducts();
  const { mutate: addCarts } = useAddCarts();

  const { products, filterCategory, searchProduct } = useProductsStore();

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    listProducts({
      limit: pageSize,
      page: page - 1,
      category: filterCategory,
      q: searchProduct,
    });
  };

  const handleAddCart = (productId: number, quantity: number) => {
    addCarts({ productId, quantity });
  };

  useEffect(() => {
    listProducts({ limit: pageSize, page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return (
      <Box
        height='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
      >
        <CircularProgress value={25} />
      </Box>
    );
  }

  return (
    <Box
      overflow='auto'
      height='100%'
      display='flex'
      flexDirection='column'
      gap={2}
      alignItems='center'
    >
      <Grid container spacing={2} p={2}>
        {products.products.map((product) => (
          <Card
            product={product}
            onAdd={(productId) => handleAddCart(productId, 1)}
            onRemove={(productId) => handleAddCart(productId, -1)}
          />
        ))}
        {products.products.length === 0 && (
          <Box
            height='400px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
          >
            <Typography variant='h5'>No se encontro productos</Typography>
          </Box>
        )}
      </Grid>
      {products.products.length !== 0 && (
        <Pagination
          count={Math.round(products.total / pageSize)}
          onChange={handlePagination}
          page={products.page}
        />
      )}
    </Box>
  );
};
