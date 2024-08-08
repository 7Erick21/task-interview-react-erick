import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { categories, pageSize } from '../../toolbox';
import { useListProducts } from '../../hooks';
import { useProductsStore } from '../../stores';

const drawerWidth = 180;

export const Sidebar: FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { mutate: filterCategoryProducts } = useListProducts();

  const { searchProduct } = useProductsStore();

  const handleCategory = (category: string) => {
    if (category === 'All')
      filterCategoryProducts({ page: 0, limit: pageSize, q: searchProduct });
    else
      filterCategoryProducts({
        page: 0,
        limit: pageSize,
        category,
        q: searchProduct,
      });
  };

  return (
    isDesktop && (
      <Box
        minWidth={drawerWidth}
        sx={{ boxShadow: '3px 0px 6px -2px rgba(0,0,0,0.75)' }}
      >
        <List>
          {categories.map((category) => (
            <ListItem
              key={category}
              disablePadding
              onClick={() => handleCategory(category)}
            >
              <ListItemButton>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  );
};
