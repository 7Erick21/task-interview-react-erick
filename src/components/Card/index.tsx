import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Dialog,
} from '@mui/material';
import { FC, useState } from 'react';
import { HeavyComponent } from '../../HeavyComponent';
import { Product } from '../../toolbox';
import { DetailProduct } from '../DetailProduct';

interface CardProps {
  product: Product;
}

export const Card: FC<CardProps> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid item lg={2} md={3} sm={4} xs={6} sx={{ cursor: 'pointer' }}>
        {/* Do not remove this */}
        <HeavyComponent />
        <MuiCard
          key={product.id}
          style={{ width: '100%', height: '100%' }}
          onClick={handleOpen}
        >
          <CardMedia component='img' height='150' image={product.imageUrl} />
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              {product.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </Typography>
          </CardContent>
        </MuiCard>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DetailProduct product={product} />
      </Dialog>
    </>
  );
};
