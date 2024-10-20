import React from 'react';
import { Button } from "@/components/ui/button";

const FavoritesList = ({ favorites, toggleFavorite }) => {
  return (
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
  );
};

export default FavoritesList;
