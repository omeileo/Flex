import localStorage from '../LocalStorage/localStorage';

/**
 * Sets the authentication status in MMKV-backed local storage.
 */
export const setAuthenticationStatus = (status: boolean) => {
  localStorage.setItem('sessionAuthenticated', status);
};

/**
 * Checks if the user is authenticated based on the stored authentication status.
 */
export const isAuthenticated = (): boolean => {
  const authStatus = localStorage.getItem('sessionAuthenticated');

  return authStatus === true;
};

/**
 * Sets the admin login status in local storage.
 */
export const setAdminLoginStatus = (status: boolean) => {
  localStorage.setItem('adminLoginStatus', status);
};

/**
 * Checks if the admin is logged in.
 */
export const isAdminLoggedIn = (): boolean => {
  const authStatus = localStorage.getItem('adminLoginStatus');

  return authStatus === true;
};
