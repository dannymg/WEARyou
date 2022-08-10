import { Box } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Users } from './containers/Users';
import { Notifications } from './containers/Notifications';
import { Clothes } from './containers/Clothes';
import { Login } from './containers/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { isUserAuthenticated } from './utils/utils';

function App() {
  return (
    <Box className='App'>
      <Routes>
        <Route path="/users" element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        <Route path="/clothes" element={
          <PrivateRoute>
            <Clothes />
          </PrivateRoute>
        } />
        <Route path="/notifications" element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        } />
        <Route path="/login" element={
          !isUserAuthenticated() ? <Login /> : <Navigate to="/users" replace />
        } />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Box>

  );
}

export default App;
