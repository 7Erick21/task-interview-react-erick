import { FC, useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Card } from '../../components/Card';
import { useListProducts } from '../../hooks';
import { useProductsStore } from '../../stores';
import { pageSize } from '../../toolbox';

export const ListProducts: FC = () => {
  const { mutate: listProducts, isPending } = useListProducts();

  const { products, newProduct, filterCategory, searchProduct } =
    useProductsStore();

  const handlePagination = (page: number) => {
    listProducts(
      {
        limit: pageSize,
        page: page,
        category: filterCategory,
        q: searchProduct,
        isPagination: true,
      },
      {
        onSuccess: (resp) => {
          newProduct(
            {
              ...resp,
              page: page,
              products: [...products.products, ...resp.products],
            },
            searchProduct,
            filterCategory
          );
        },
      }
    );
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      if (products.hasMore) handlePagination(products.page + 1);
    }
  };

  useEffect(() => {
    listProducts({ limit: pageSize, page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const miDiv = document.getElementById('miDiv');
    if (miDiv) {
      miDiv.scrollTop = 0;
    }
  }, [searchProduct, filterCategory]);

  return (
    <Box
      id='miDiv'
      component='div'
      overflow='auto'
      height='100%'
      display='flex'
      flexDirection='column'
      gap={2}
      alignItems='center'
      onScroll={handleScroll}
    >
      <Grid container spacing={2} p={2}>
        {products.products.map((product) => (
          <Card product={product} />
        ))}
        {isPending && (
          <Box
            height='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
          >
            <CircularProgress value={25} />
          </Box>
        )}
        {!isPending && products.products.length === 0 && (
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
    </Box>
  );
};
