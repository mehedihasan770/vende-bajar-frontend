import Cookies from 'js-cookie';

const TOKEN_KEY = 'vende_token';

// Save Token
export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { 
    expires: 7,
    secure: true,
    sameSite: 'strict'
  });
};


// Get Toekn
export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

// Remove token || LogOut
export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};