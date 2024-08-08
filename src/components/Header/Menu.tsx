import { IconButton, MenuItem, Menu as MuiMenu } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { FC, useState } from 'react';
import { categories, pageSize } from '../../toolbox';
import { useListProducts } from '../../hooks';
import { useProductsStore } from '../../stores';

const ITEM_HEIGHT = 48;

export const Menu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <MuiMenu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            selected={category === 'Pyxis'}
            onClick={() => handleCategory(category)}
          >
            {category}
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  );
};
