import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    // Save user info and redirect to dashboard
    navigate('/dashboard');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      // Handle login
      console.log('Logging in with:', { email, password });
    } else {
      // Handle register
      console.log('Registering with:', { email, password });
    }
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-900">
      <div className="bg-dark-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-2 border rounded mb-3 bg-gray-700 text-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-3 bg-gray-700 text-gray-200 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 w-full">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
          />
        </div>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-3 text-blue-500">
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
