import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SearchResults = ({
  results,
  currentPage,
  totalPages,
  setCurrentPage,
  toggleFavorite,
  favorites
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, index) => (
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
  );
};

export default SearchResults;
