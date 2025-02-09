import React, { useState } from 'react';
import { Shield, Lock, User } from 'lucide-react';
import { supabase } from "./supabaseClient";
import backgroundImage from "../assests/Logo.png";  // Import the image

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const { error } = await supabase.from('users').insert([{ username, password }]);
      if (error) {
        console.error('Error inserting data:', error);
        alert('Failed to register user.');
      } else {
        alert('Registration successful!');
        setIsRegistering(false);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center bg-blend-overlay"
      style={{ backgroundImage: `url(${backgroundImage})` }}  // Use the imported image here
    >
      <div className="w-full max-w-md p-8 bg-gray-800/90 rounded-lg shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-16 h-16 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-100">Incorrupta</h1>
        </div>

        {/* Toggle between Register and Login forms */}
        {isRegistering ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg font-medium">
              Register
            </button>

            <div className="text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <button type="button" onClick={() => setIsRegistering(false)} className="text-blue-400 hover:underline">
                  Log in
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
              Login
            </button>

            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsRegistering(true)} className="text-blue-400 hover:underline">
                  Register
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
