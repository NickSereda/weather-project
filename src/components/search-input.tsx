'use client';

import { useWeatherStore } from '@/store/weather-store';
import { FormEvent, useEffect } from 'react';
import { getWeatherByCity } from '@/lib/api';
import { WeatherData } from '@/types/weather-data';

interface SearchInputProps {
  initialCity: string;
}

const SearchInput = ({ initialCity }: SearchInputProps) => {
  const { city, setCity, setWeather, setLoading, setError } = useWeatherStore();

  useEffect(() => {
    setCity(initialCity);
  }, [initialCity, setCity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const weatherData: WeatherData = await getWeatherByCity(city);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
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