import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import FavoritesList from './FavoritesList';

const DomainSearch = () => {
  const [prefix, setPrefix] = useState('');
  const [extension, setExtension] = useState('');
  const [meaningfulOnly, setMeaningfulOnly] = useState(true);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [maxLength, setMaxLength] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 10;

  const searchDomains = useCallback(() => {
    setLoading(true);
    setError(null);

    // Simulating an API call with setTimeout
    setTimeout(() => {
      try {
        // This is a mock function. In a real application, you would call an API to check domain availability and perform filtering.
        const mockResults = [
          { domain: 'ho.me', available: true, meaningful: true, length: 4, price: 29.99 },
          { domain: 'ca.fe', available: false, meaningful: true, length: 4, price: 49.99 },
          { domain: 'co.de', available: true, meaningful: true, length: 4, price: 39.99 },
          { domain: 'ap.ps', available: true, meaningful: false, length: 4, price: 19.99 },
          { domain: 'book.store', available: true, meaningful: true, length: 9, price: 14.99 },
          { domain: 'tech.hub', available: true, meaningful: true, length: 8, price: 24.99 },
          { domain: 'eco.life', available: true, meaningful: true, length: 8, price: 34.99 },
          { domain: 'fit.ness', available: false, meaningful: true, length: 7, price: 44.99 },
          { domain: 'art.gallery', available: true, meaningful: true, length: 11, price: 54.99 },
          { domain: 'smart.home', available: true, meaningful: true, length: 9, price: 64.99 },
          { domain: 'food.truck', available: false, meaningful: true, length: 9, price: 74.99 },
          { domain: 'travel.blog', available: true, meaningful: true, length: 10, price: 84.99 },
        ];

        let filteredResults = mockResults;

        if (prefix) {
          filteredResults = filteredResults.filter(result => result.domain.startsWith(prefix));
        }

        if (extension) {
          filteredResults = filteredResults.filter(result => result.domain.endsWith(extension));
        }

        if (meaningfulOnly) {
          filteredResults = filteredResults.filter(result => result.meaningful);
        }

        if (availableOnly) {
          filteredResults = filteredResults.filter(result => result.available);
        }

        filteredResults = filteredResults.filter(result => result.domain.length <= maxLength);

        // Sorting
        switch (sortBy) {
          case 'length':
            filteredResults.sort((a, b) => a.length - b.length);
            break;
          case 'price':
            filteredResults.sort((a, b) => a.price - b.price);
            break;
          // 'relevance' is the default, no sorting needed
        }

        setResults(filteredResults);
        setTotalPages(Math.ceil(filteredResults.length / itemsPerPage));
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while searching domains. Please try again.');
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  }, [prefix, extension, meaningfulOnly, availableOnly, maxLength, sortBy]);

  useEffect(() => {
    searchDomains();
  }, [searchDomains]);

  const toggleFavorite = (domain) => {
    setFavorites(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Domain</h1>
      
      <SearchForm
        prefix={prefix}
        setPrefix={setPrefix}
        extension={extension}
        setExtension={setExtension}
        meaningfulOnly={meaningfulOnly}
        setMeaningfulOnly={setMeaningfulOnly}
        availableOnly={availableOnly}
        setAvailableOnly={setAvailableOnly}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchDomains={searchDomains}
        loading={loading}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SearchResults
        results={paginatedResults}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      <FavoritesList
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default DomainSearch;
