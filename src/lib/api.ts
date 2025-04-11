import axios from 'axios';
import { WeatherData } from '@/types/weather-data';
import { ERROR_MESSAGES } from './constants';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: isServer ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api` : '/api',
});

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await api.get<WeatherData>('/weather', {
      params: { city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      throw new Error(
        status === 404
          ? ERROR_MESSAGES.CITY_NOT_FOUND
          : status === 400
          ? error.response?.data.message
          : ERROR_MESSAGES.FETCH_FAILED
      );
    }
    throw new Error(ERROR_MESSAGES.FETCH_FAILED);
  }
};