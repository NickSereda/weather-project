import WeatherCard from '@/components/weather-card';
import SearchInput from '@/components/search-input';
import { Suspense } from 'react';

import { getWeatherByCity } from '@/lib/api';


export default async function Home() {
  const defaultCity = 'London';
  const initialWeather = await getWeatherByCity(defaultCity);

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