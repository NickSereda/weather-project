/// This file defines the structure of the weather data returned by the OpenWeatherMap API.
export interface WeatherData {
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
  }