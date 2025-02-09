import React, { useState } from 'react';
import { Search, Eye, Download } from 'lucide-react';

const MOCK_RESULTS = [
  {
    id: 1,
    firNumber: "FIR2024001",
    fileName: "crime_scene_photo.jpg",
    fileType: "image/jpeg",
    uploadedBy: "Officer Gaikwad",
    uploadDate: "2024-03-10",
    ipfsHash: "QmX7b5rQZMwXs9FvUZGKgMnZQKn7K8qBtPh6v6vQZ9Z7Z7"
  },
  {
    id: 2,
    firNumber: "FIR2024001",
    fileName: "witness_statement.pdf",
    fileType: "application/pdf",
    uploadedBy: "Officer RAMESH",
    uploadDate: "2024-03-10",
    ipfsHash: "QmX7b5rQZMwXs9FvUZGKgMnZQKn7K8qBtPh6v6vQZ9Z7Z8"
  }
];

function SearchEvidence() {
  const [firNumber, setFirNumber] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search - in real app would filter based on FIR number
    setResults(MOCK_RESULTS);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Search Evidence</h1>
        <p className="text-gray-400">Search for evidence files by FIR number</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter FIR number"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-gray-800 p-4 rounded-lg flex items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="font-medium">{result.fileName}</h3>
                <div className="mt-1 text-sm text-gray-400 space-y-1">
                  <p>FIR Number: {result.firNumber}</p>
                  <p>Uploaded by: {result.uploadedBy} on {result.uploadDate}</p>
                  <p>IPFS Hash: {result.ipfsHash}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg" title="View Evidence">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg" title="Download Evidence">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEvidence