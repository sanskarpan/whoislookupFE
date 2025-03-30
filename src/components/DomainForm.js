import React, { useState } from 'react';

function DomainForm({ onSubmit, isLoading }) {
  const [domain, setDomain] = useState('');
  const [infoType, setInfoType] = useState('domain');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic domain validation
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    // Simple domain format check
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }
    
    setError('');
    onSubmit(domain, infoType);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Domain Lookup</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter a domain name to retrieve its information using the Whois API.</p>
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-red-600">{error}</div>
        )}
        
        <form className="mt-5 sm:flex sm:items-end" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="domain-name" className="block text-sm font-medium text-gray-700">
              Domain Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="domain-name"
                id="domain-name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6 sm:w-40">
            <label htmlFor="info-type" className="block text-sm font-medium text-gray-700">
              Information Type
            </label>
            <select
              id="info-type"
              name="info-type"
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="domain">Domain Information</option>
              <option value="contact">Contact Information</option>
            </select>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm 
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DomainForm;