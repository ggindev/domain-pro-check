import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const SearchForm = ({
  prefix,
  setPrefix,
  extension,
  setExtension,
  meaningfulOnly,
  setMeaningfulOnly,
  availableOnly,
  setAvailableOnly,
  maxLength,
  setMaxLength,
  sortBy,
  setSortBy,
  searchDomains,
  loading
}) => {
  const extensions = ['.com', '.net', '.org', '.io', '.ai', '.me', '.co', '.app', '.dev'];

  return (
    <div>
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
    </div>
  );
};

export default SearchForm;
