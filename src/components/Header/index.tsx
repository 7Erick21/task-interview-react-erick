import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Dialog, useMediaQuery, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FC, useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './Header.styled';
import { Menu } from './Menu';
import { useListProducts } from '../../hooks';
import { pageSize } from '../../toolbox';
import { useProductsStore } from '../../stores';
import { Carts } from '../Carts';

interface SearchAppBarProps {
  quantity: number;
  price: number;
}

export const SearchAppBar: FC<SearchAppBarProps> = ({ quantity, price }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { filterCategory } = useProductsStore();
  const { mutate: filterProducts } = useListProducts();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box marginBottom={9}>
      <AppBar position='fixed'>
        <Toolbar>
          {!isDesktop ? (
            <Menu />
          ) : (
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1 }}
            >
              FreshCart Market
            </Typography>
          )}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) =>
                filterProducts({
                  limit: pageSize,
                  page: 0,
                  q: e.target.value,
                  category: filterCategory,
                })
              }
            />
          </Search>
          <Box display='flex' flexDirection='row' mr={2}>
            <Typography noWrap component='div' mr={2}>
              Total:
            </Typography>
            <Typography noWrap component='div'>
              $ {(price || 0).toFixed(2)}
            </Typography>
          </Box>
          <Badge
            badgeContent={quantity || 0}
            color='secondary'
            onClick={handleOpen}
          >
            <ShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Carts />
      </Dialog>
    </Box>
  );
};
