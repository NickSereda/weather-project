'use client';

import { useWeatherStore } from '@/store/weather-store';
import { WeatherData } from '@/types/weather-data';
import Image from 'next/image';

interface WeatherCardProps {
  initialWeather: WeatherData | null;
}

const WeatherCard = ({ initialWeather }: WeatherCardProps) => {

  // Render initialWeather directly on first paint if Zustand isn’t yet hydrated.
  const { weather, loading, error } = useWeatherStore();

  const hydrated = !!weather || !!initialWeather;
  const displayWeather = weather || initialWeather; // ✅ Fallback early

  if (loading) return <div className="text-center animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!hydrated) return null;

  return (
    <div className="transition-all duration-300 ease-in-out" key={displayWeather?.name}>
      <div className="bg-white shadow-lg rounded-lg p-6 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
        <h2 className="text-2xl font-bold mb-4">
          {displayWeather?.name}, {displayWeather?.sys.country}
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg capitalize">{displayWeather?.weather[0].description}</p>
            <p className="text-4xl font-semibold">{displayWeather?.main.temp}°C</p>
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${displayWeather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p>Humidity: {displayWeather?.main.humidity}%</p>
          <p>Wind: {displayWeather?.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
