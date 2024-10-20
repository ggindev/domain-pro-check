import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

  const extensions = ['.com', '.net', '.org', '.io', '.ai', '.me', '.co', '.app', '.dev'];
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
      
      <div className="flex space-x-4">
        <Input
          placeholder="Domain prefix (e.g., 'ho')"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setExtension} value={extension}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select extension" />
          </SelectTrigger>
          <SelectContent>
            {extensions.map(ext => (
              <SelectItem key={ext} value={ext}>{ext}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="meaningful"
              checked={meaningfulOnly}
              onCheckedChange={setMeaningfulOnly}
            />
            <Label htmlFor="meaningful">Meaningful combinations only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={availableOnly}
              onCheckedChange={setAvailableOnly}
            />
            <Label htmlFor="available">Available domains only</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLength">Maximum domain length: {maxLength}</Label>
          <Slider
            id="maxLength"
            min={2}
            max={63}
            step={1}
            value={[maxLength]}
            onValueChange={(value) => setMaxLength(value[0])}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="sortBy">Sort by:</Label>
          <Select onValueChange={setSortBy} value={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={searchDomains} className="w-full" disabled={loading}>
        <Search className="w-4 h-4 mr-2" /> {loading ? 'Searching...' : 'Search Domains'}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {paginatedResults.length > 0 ? (
          <div className="space-y-4">
            {paginatedResults.map((result, index) => (
              <Card key={index}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="text-lg font-medium">{result.domain}</h3>
                    <p className="text-sm text-gray-500">Length: {result.length}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={result.available ? "success" : "destructive"}>
                      {result.available ? 'Available' : 'Taken'}
                    </Badge>
                    <p className="font-semibold">${result.price.toFixed(2)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(result.domain)}
                    >
                      {favorites.includes(result.domain) ? '★' : '☆'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found. Try adjusting your search criteria.</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Favorite Domains</h2>
          <ul className="space-y-2">
            {favorites.map((domain, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span>{domain}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(domain)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DomainSearch;
