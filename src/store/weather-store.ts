'use client';

import { create } from 'zustand';
import { WeatherData } from '@/types/weather-data';
import { getWeatherByCity } from '@/lib/api';
// Zustand store file (e.g., weather-store.ts)

interface WeatherState {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string) => void;
  fetchWeather: (city: string) => Promise<void>;
  initializeWeather: (initialWeather: WeatherData | null) => void; // 👈 Add this line
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
  initializeWeather: (initialWeather) => set({ weather: initialWeather }), // 👈 Add this
}));
