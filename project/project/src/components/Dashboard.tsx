import React, { useState } from 'react';
import { Shield, Upload, Search, LogOut, Home, Filter, Eye, Download } from 'lucide-react';
import UploadEvidence from './UploadEvidence';
import SearchEvidence from './SearchEvidence';

const MOCK_CASES = [
  { firNumber: "FIR2024001", date: "2024-03-10", officer: "Officer Smith", status: "Open" },
  { firNumber: "FIR2024002", date: "2024-03-09", officer: "Officer Johnson", status: "Closed" },
  { firNumber: "FIR2024003", date: "2024-03-08", officer: "Officer Davis", status: "Pending" },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 p-4 flex flex-col items-center gap-8">
        <Shield className="w-10 h-10 text-blue-500" />
        <nav className="flex flex-col gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`p-2 rounded-lg ${activeTab === 'upload' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Upload className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`p-2 rounded-lg ${activeTab === 'search' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Search className="w-6 h-6" />
          </button>
        </nav>
        <button className="mt-auto p-2 rounded-lg hover:bg-gray-700">
          <LogOut className="w-6 h-6 text-red-400" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FIR Number"
                    className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left">FIR Number</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Officer</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CASES.map((case_) => (
                    <tr key={case_.firNumber} className="border-b border-gray-700">
                      <td className="px-6 py-4">{case_.firNumber}</td>
                      <td className="px-6 py-4">{case_.date}</td>
                      <td className="px-6 py-4">{case_.officer}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          case_.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                          case_.status === 'Closed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {case_.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'upload' && <UploadEvidence />}
        {activeTab === 'search' && <SearchEvidence />}
      </div>
    </div>
  );
}

export default Dashboard;