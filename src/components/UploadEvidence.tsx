import React, { useState, useEffect } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import axios from 'axios';

function UploadEvidence() {
  const [file, setFile] = useState<File | null>(null);
  const [firNumber, setFirNumber] = useState('');
  const [progress, setProgress] = useState(0);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [configError, setConfigError] = useState('');

  useEffect(() => {
    // Check for required environment variables
    if (!import.meta.env.VITE_PINATA_API_KEY || !import.meta.env.VITE_PINATA_SECRET_API_KEY) {
      setConfigError('Pinata API keys are not configured. Please add VITE_PINATA_API_KEY and VITE_PINATA_SECRET_API_KEY to your .env file.');
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    if (configError) {
      setError(configError);
      return;
    }

    try {
      setUploading(true);
      setError('');
      setProgress(10);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Add metadata
      const metadata = {
        name: file.name,
        keyvalues: {
          firNumber: firNumber || 'UNASSIGNED',
          uploadDate: new Date().toISOString(),
          fileType: file.type,
          fileSize: file.size.toString()
        }
      };
      formData.append('pinataMetadata', JSON.stringify(metadata));

      // Add options
      const options = {
        cidVersion: 1,
        wrapWithDirectory: false
      };
      formData.append('pinataOptions', JSON.stringify(options));

      setProgress(30);

      // Upload to IPFS through Pinata
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
            'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(30 + (percentCompleted * 0.6));
          }
        }
      );

      setProgress(90);

      if (response.data?.IpfsHash) {
        const ipfsHash = response.data.IpfsHash;
        const url = `ipfs://${ipfsHash}`;
        setIpfsUrl(url);
        setProgress(100);
      } else {
        throw new Error('Invalid response from Pinata');
      }
    } catch (err) {
      let errorMessage = 'Failed to upload file. Please check your API keys and try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const anyErr = err as any;
        if (anyErr.response?.status === 401) {
          errorMessage = 'Invalid or missing Pinata API keys. Please check your .env configuration.';
        } else if (anyErr.response?.data?.error) {
          errorMessage = typeof anyErr.response.data.error === 'string'
            ? anyErr.response.data.error
            : 'Invalid response from server';
        }
      }
      
      setError(errorMessage);
      console.error('Upload error:', errorMessage);
    } finally {
      setUploading(false);
      if (!ipfsUrl) {
        setProgress(0);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setIpfsUrl('');
      setProgress(0);
    }
  };

  if (configError) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-red-500/20 text-red-400 p-6 rounded-lg flex items-start gap-4">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-bold text-lg mb-2">Configuration Error</h2>
            <p className="text-sm">{configError}</p>
            <p className="text-sm mt-4">
              To fix this:
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>Create a .env file in your project root if it doesn't exist</li>
                <li>Add your Pinata API keys to the .env file:</li>
                <pre className="bg-gray-900/50 p-3 rounded mt-2 text-xs">
                  VITE_PINATA_API_KEY=your_api_key_here{'\n'}
                  VITE_PINATA_SECRET_API_KEY=your_secret_key_here
                </pre>
                <li>Restart your development server</li>
              </ol>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Upload Evidence to IPFS</h1>
        <p className="text-gray-400">Securely store evidence files on the decentralized network</p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <input
            type="file"
            className="hidden"
            id="evidence-file"
            onChange={handleFileChange}
          />
          <label
            htmlFor="evidence-file"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">Supported files: PDF, JPG, PNG, MP4</p>
            </div>
          </label>
        </div>

        {file && (
          <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
            <File className="w-6 h-6 text-blue-400" />
            <div className="flex-1">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">FIR Number (Optional)</label>
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter FIR number"
          />
        </div>

        {progress > 0 && progress < 100 && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Uploading to IPFS...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/20 text-red-400 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {ipfsUrl && (
          <div className="p-4 bg-green-500/20 text-green-400 rounded-lg">
            <p className="font-medium">Upload Complete!</p>
            <p className="text-sm mt-1 break-all">IPFS URL: {ipfsUrl}</p>
            <p className="text-sm mt-1">
              <a 
                href={`https://gateway.pinata.cloud/ipfs/${ipfsUrl.replace('ipfs://', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                View on IPFS Gateway
              </a>
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload to IPFS'}
        </button>
      </div>
    </div>
  );
}

export default UploadEvidence;