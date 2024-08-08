import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { Box, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { SearchAppBar, Sidebar } from '../components';
import { useCarsStore } from '../stores';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = createTheme();
  const { carts } = useCarsStore();

  const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <CssBaseline />
        <Box height='100vh' display='flex' flexDirection='column'>
          <SearchAppBar
            quantity={carts?.totalItems || 0}
            price={carts?.totalPrice || 0}
          />
          <Box
            flex={1}
            display='flex'
            flexDirection='row'
            height='calc(100vh - 72px)'
          >
            <Sidebar />
            {children}
          </Box>
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
