'use client';

import React, { useState } from 'react';
import { useAuth } from '../app/AuthWrapper';

export default function AuthDemo () {
  const { user, loading, login, logout, demoCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('Logging in...');
    const success = await login(email, password);
    setLoginStatus(success ? 'Login successful!' : 'Login failed');
  };

  const handleDemoLogin = async (type: 'customer' | 'admin') => {
    setLoginStatus('Logging in with demo account...');
    const success = await login(
      demoCredentials[type].email,
      demoCredentials[type].password
    );
    setLoginStatus(success ? 'Demo login successful!' : 'Demo login failed');
  };

  const handleLogout = () => {
    logout();
    setLoginStatus('Logged out successfully');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Authentication Status</h2>
        {user ? (
          <div>
            <p>Logged in as: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>

      {!user && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Login Form</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <h3 className="font-bold mb-2">Quick Demo Login:</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('customer')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Login as Customer
              </button>
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {loginStatus && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>{loginStatus}</p>
        </div>
      )}
    </div>
  );
};

