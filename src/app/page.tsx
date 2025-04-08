import { getWeatherByCity } from '@/lib/api';
import WeatherCard from '@/components/weather-card';
import SearchInput from '@/components/search-input';
import { WeatherData } from '@/types/weather-data';

export default async function Home() {
  const defaultCity = 'London';
  let weather: WeatherData | undefined;
  let error: string | undefined;

  try {
    weather = await getWeatherByCity(defaultCity);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch weather data';
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Weather Widget</h1>
        <SearchInput initialCity={defaultCity} />
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <WeatherCard initialWeather={weather} />
        )}
      </div>
    </div>
  );
}