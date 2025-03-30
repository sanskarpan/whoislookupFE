import React, { useState, useEffect } from 'react';
import { fetchDomainInfo } from './services/api';
import Header from './components/Header';
import DomainForm from './components/DomainForm';
import DomainInfoTable from './components/DomainInfoTable';
import ContactInfoTable from './components/ContactInfoTable';
import ErrorAlert from './components/ErrorAlert';
import Loading from './components/Loading';

function App() {
  const [domainData, setDomainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoType, setInfoType] = useState(null);

  const handleSubmit = async (domain, type) => {
    setLoading(true);
    setError(null);
    setDomainData(null);
    setInfoType(type);

    try {
      const data = await fetchDomainInfo(domain, type);
      setDomainData(data);
    } catch (err) {
      console.error('Error fetching domain data:', err);
      setError(err.message || 'An error occurred while fetching domain information.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <DomainForm onSubmit={handleSubmit} isLoading={loading} />
            
            {error && <ErrorAlert message={error} onClose={clearError} />}
            
            {loading && <Loading />}
            
            {!loading && domainData && infoType === 'domain' && (
              <DomainInfoTable data={domainData} />
            )}
            
            {!loading && domainData && infoType === 'contact' && (
              <ContactInfoTable data={domainData} />
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Whois Domain Lookup. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;