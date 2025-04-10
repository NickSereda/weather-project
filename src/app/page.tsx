import WeatherCard from '@/components/weather-card';
import SearchInput from '@/components/search-input';
import { Suspense } from 'react';
import axios from 'axios';
import { WeatherData } from '@/types/weather-data';

// This function is server-side
async function fetchInitialWeather(city: string): Promise<WeatherData | null> {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data as WeatherData;
  } catch (error) {
    // Log the error for debugging (optional, remove if not needed)
    console.error(`Failed to fetch weather for ${city}:`, error);
    return null;
  }
}

export default async function Home() {
  const defaultCity = 'London';
  const initialWeather = await fetchInitialWeather(defaultCity);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Weather</h1>
        <SearchInput initialCity={defaultCity} />
        <Suspense fallback={<div className="text-center animate-pulse">Loading weather...</div>}>
          <WeatherCard initialWeather={initialWeather} />
        </Suspense>
      </div>
    </div>
  );
}