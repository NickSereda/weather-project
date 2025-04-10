'use client';

import { create } from 'zustand';
import { WeatherData } from '@/types/weather-data';
import { getWeatherByCity } from '@/lib/api';
interface WeatherState {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string) => void;
  fetchWeather: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  city: '',
  weather: null,
  loading: false,
  error: null,
  setCity: (city) => set({ city }),
  fetchWeather: async (city) => {
    set({ loading: true, error: null });
    try {
      const weather = await getWeatherByCity(city);
      set({ weather, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  },
}));