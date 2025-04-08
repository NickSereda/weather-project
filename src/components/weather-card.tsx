'use client';

import { useWeatherStore } from '@/store/weather-store';
import { WeatherData } from '@/types/weather-data';
import Image from 'next/image';

interface WeatherCardProps {
  initialWeather?: WeatherData;
}

/// This component displays the weather information for a given city.
const WeatherCard = ({ initialWeather }: WeatherCardProps) => {
  const { weather: storeWeather, loading, error } = useWeatherStore();
  const weather = storeWeather || initialWeather;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!weather) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
          <p className="text-4xl font-semibold">{weather.main.temp}°C</p>
        </div>
        <Image
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;