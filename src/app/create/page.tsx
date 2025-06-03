'use client';

import { useState, useEffect, Suspense } from 'react';

export default function CreateComponent() {
  const [name, setComponentName] = useState('');
  const [code, setComponentCode] = useState('');
  const [status, setStatus] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Uploading...');

    try {
      // Upload component through our API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setStatus('Component created successfully!');
      setComponentName('');
      setComponentCode('');
    } catch (error) {
      console.error('Error:', error);
      setStatus(`Error creating component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Component</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="componentName" className="block text-sm font-medium mb-2">
              Component Name
            </label>
            <input
              type="text"
              id="componentName"
              value={name}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., Header"
              required
            />
          </div>
          <div>
            <label htmlFor="componentCode" className="block text-sm font-medium mb-2">
              Component Code
            </label>
            <textarea
              id="componentCode"
              value={code}
              onChange={(e) => setComponentCode(e.target.value)}
              className="w-full p-2 border rounded h-64 font-mono"
              placeholder="export default function Component() { ... }"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Component
          </button>
        </form>
        {status && (
          <div className={`mt-4 p-4 rounded ${
            status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {status}
          </div>
        )}
      </div>
    </Suspense>
  );
} 