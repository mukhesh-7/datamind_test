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

export const resetPassword = async (email: string) => {
  console.log(`Simulating sending password reset email to: ${email}`);
  return { success: true, message: `Password reset email sent to ${email}.` };
};
