import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './containers/Home';

function App() {
  return (
    <Box className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>

  );
}

export default App;
