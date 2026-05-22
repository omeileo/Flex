import localStorage from '../LocalStorage/localStorage';
import { UserRole } from './userRoleManagement.types';

const USER_ROLE_KEY = 'userRole';

export const setUserRole = (role: UserRole): void => {
  localStorage.setItem(USER_ROLE_KEY, role);
};

export const getUserRole = (): UserRole | null => {
  const role = localStorage.getItem(USER_ROLE_KEY);

  return role ? (role as UserRole) : null;
};

export const removeUserRole = (): void => {
  localStorage.removeItem(USER_ROLE_KEY);
};
