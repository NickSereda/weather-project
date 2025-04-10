import axios, { AxiosError } from 'axios';
import { ERROR_MESSAGES } from './constants';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await api.get('/weather', {
      params: {
        q: city,
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response) {
        // Server responded with an error (e.g., 404 for invalid city)
        const status = axiosError.response.status;
        throw new Error(
          status === 404
            ? ERROR_MESSAGES.CITY_NOT_FOUND
            : `${ERROR_MESSAGES.FETCH_FAILED}: ${status}`,
        );
      } else if (axiosError.request) {
        // No response (e.g., network issue)
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
    }
    // Fallback for unexpected errors
    throw new Error(ERROR_MESSAGES.FETCH_FAILED);
  }
};