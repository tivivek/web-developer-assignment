import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, otp);
      console.log('API Response:', response); // Log to check the response structure
      if (response?.status === 200) {
        const token = response?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          navigate('/quotes');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-6">Login</h1>
      <input
        className="border p-2 mb-4 w-64"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-64"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleLogin}
      >
        Submit
      </button>
    </div>
  );
};

export default LoginPage;
