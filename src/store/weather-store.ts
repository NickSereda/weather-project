'use client';

import { create } from 'zustand';
import { WeatherData } from '@/types/weather-data';

interface WeatherState {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string) => void;
  setWeather: (weather: WeatherData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  city: '',
  weather: null,
  loading: false,
  error: null,
  setCity: (city) => set({ city }),
  setWeather: (weather) => set({ weather }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));