export const login = async (email: string, password: string) => {
  localStorage.setItem('auth', JSON.stringify({ email }));
};

export const register = async (email: string, password: string) => {
  localStorage.setItem('auth', JSON.stringify({ email }));
};

export const logout = () => {
  localStorage.removeItem('auth');
};

export const isAuthenticated = () => {
  return localStorage.getItem('auth') !== null;
};
