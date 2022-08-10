import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '../../utils/utils';

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = isUserAuthenticated();

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={'/login'} replace />;

}



