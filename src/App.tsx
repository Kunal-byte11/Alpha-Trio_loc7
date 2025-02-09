import React, { useState } from 'react';
import { Shield, Upload, Search, LogOut, Home, Fingerprint, Lock, User, Filter, Eye, Download } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = (username: string, password: string) => {
    // Simulate authentication
    if (username && password) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;