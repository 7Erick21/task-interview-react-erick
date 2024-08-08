import { Box } from '@mui/material';
import { Layout } from './layout';
import { ListProducts } from './views';

function App() {
  return (
    <Layout>
      <Box flex={1}>
        <ListProducts />
      </Box>
    </Layout>
  );
}

export default App;
