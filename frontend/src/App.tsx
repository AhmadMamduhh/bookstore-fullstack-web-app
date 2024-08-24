import { Box } from '@mui/material';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes';

function App() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden'  }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flex: 1, p: 3, bgcolor: '#f9f9f9', overflowY: 'auto' }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default App;
