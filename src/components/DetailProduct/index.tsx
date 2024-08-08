import { FC } from 'react';
import { Product } from '../../toolbox';
import { Typography, Box, IconButton, SxProps } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

interface DetailProductProps {
  product: Product;
  onAdd: (productId: number) => void;
  onRemove: (productId: number) => void;
}

const style: SxProps = {
  maxWidth: 500,
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const DetailProduct: FC<DetailProductProps> = ({
  product,
  onAdd,
  onRemove,
}) => {
  return (
    <Box sx={style}>
      <Box display='flex' flexWrap='wrap' gap={2} alignItems='flex-end'>
        <img src={product.imageUrl} alt={product.name} />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          flexGrow={1}
        >
          <Typography variant='h6' component='div' mb={2}>
            Categoria: {product.category}
          </Typography>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography component='div'>${product.price}</Typography>
            <Box flexGrow={1} />
            <Box
              position='relative'
              display='flex'
              flexDirection='row'
              alignItems='center'
            >
              <IconButton
                aria-label='delete'
                size='small'
                onClick={() => onRemove(product.id)}
              >
                <RemoveIcon fontSize='small' />
              </IconButton>

              <Typography variant='body1' component='div' mx={1}>
                {product.itemInCart || 0}
              </Typography>

              <IconButton
                aria-label='add'
                size='small'
                onClick={() => onAdd(product.id)}
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
