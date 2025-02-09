import React, { useState } from 'react';
import { Shield, Fingerprint, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-[url('https://images.unsplash.com/photo-1617839420769-6a8f62495ef0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-blend-overlay">
      <div className="w-full max-w-md p-8 bg-gray-800/90 rounded-lg shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-16 h-16 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-100">Police Evidence System</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
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
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Login
          </button>
          
          <button
            type="button"
            className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Fingerprint className="w-5 h-5" />
            Fingerprint Login
          </button>
          
          <div className="text-center">
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login