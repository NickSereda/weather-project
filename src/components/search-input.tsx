'use client';

import { useWeatherStore } from '@/store/weather-store';
import { FormEvent, useEffect } from 'react';

interface SearchInputProps {
  initialCity: string;
}

/// This component renders a search input for the user to enter a city name.
const SearchInput = ({ initialCity }: SearchInputProps) => {
  const { city, setCity, fetchWeather } = useWeatherStore();

  useEffect(() => {
    setCity(initialCity);
  }, [initialCity, setCity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (city) await fetchWeather(city);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
};

export default SearchInput;