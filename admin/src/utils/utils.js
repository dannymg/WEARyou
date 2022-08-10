import jwtDecode from 'jwt-decode';

export function isUserAuthenticated() {
  let isValidToken = false;

  try {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    isValidToken = decoded && decoded.sub;
  } catch (err) {
    return false;
  }

  return isValidToken;
}
