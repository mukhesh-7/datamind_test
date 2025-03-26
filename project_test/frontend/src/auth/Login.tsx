// src/auth/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleOAuthConsent } from './google_oauth'; // Corrected import path

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (credentials.email === "test@example.com" && credentials.password === "password") {
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleGoogleSignIn = () => {
    handleOAuthConsent();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-4" onChange={handleChange} />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
        <button onClick={handleGoogleSignIn} className="bg-red-600 text-white px-4 py-2 w-full mt-2">Sign in with Google</button>
        <p className="mt-4 text-sm">
          Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;