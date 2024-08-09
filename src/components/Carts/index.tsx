import { FC, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCarsStore } from '../../stores';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import { publicApi, publicApiPaymentMarket } from '../../toolbox';
import { CartButtons } from './CartButtons';

export const Carts: FC = () => {
  const { carts } = useCarsStore();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  initMercadoPago(publicApiPaymentMarket, {
    locale: 'es-PE',
  });

  const createPreference = async () => {
    setLoading(true);
    try {
      const { id } = await fetch(`${publicApi}/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Compras Online',
          quantity: 1,
          price: carts.totalPrice,
        }),
      }).then((response) => response.json());

      return id;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    setDisabled(true);
    const id = await createPreference();

    if (id) setPreferenceId(id);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      p={2}
      maxWidth='600px'
      width='max-content'
    >
      <Typography variant='h6'>Total: {carts.totalPrice.toFixed(2)}</Typography>
      {carts.items.map((product) => {
        const { id, name, imageUrl, price, itemInCart } = product;

        return (
          <Box key={id} display='flex' gap={2} alignItems='center'>
            <CardMedia component='img' height='150' image={imageUrl} />
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                {name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                price: {price.toFixed(2)}
              </Typography>
              <CartButtons product={product} disabled={disabled} />
              <Typography variant='body2' color='text.secondary'>
                total: {(itemInCart * price).toFixed(2)}
              </Typography>
            </CardContent>
          </Box>
        );
      })}

      {carts.items.length === 0 && (
        <Box display='flex' gap={2} alignItems='center'>
          <Typography variant='h6'>
            No tienes productos en el carrito
          </Typography>
        </Box>
      )}

      {!preferenceId && (
        <Button disabled={loading} onClick={handleBuy} variant='contained'>
          comprar
        </Button>
      )}
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          onReady={() => {
            setDisabled(true);
            console.log('first');
          }}
        />
      )}
    </Box>
  );
};
