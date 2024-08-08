import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Badge, useMediaQuery, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FC } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './Header.styled';
import { Menu } from './Menu';
import { useListProducts } from '../../hooks';
import { pageSize } from '../../toolbox';
import { useProductsStore } from '../../stores';

interface SearchAppBarProps {
  quantity: number;
  price: number;
}

export const SearchAppBar: FC<SearchAppBarProps> = ({ quantity, price }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { filterCategory } = useProductsStore();
  const { mutate: filterProducts } = useListProducts();

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
          <Badge badgeContent={quantity || 0} color='secondary'>
            <ShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
