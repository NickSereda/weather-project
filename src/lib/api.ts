import axios, { AxiosError } from 'axios';

/// This code creates an Axios instance for making HTTP requests to the OpenWeatherMap API.
const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

/// This function fetches weather data for a given city using the OpenWeatherMap API.
/// It constructs the API request with the city name, API key, and desired units.
/// It returns the weather data if the request is successful.
/// If an error occurs, it logs the error details and throws a new error.
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
          status === 404 ? 'City not found' : `Server error: ${status}`,
        );
      } else if (axiosError.request) {
        // No response (e.g., network issue)
        throw new Error('Network error: No response from server');
      }
    }
    // Fallback for unexpected errors
    throw new Error('Failed to fetch weather data');
  }
};

