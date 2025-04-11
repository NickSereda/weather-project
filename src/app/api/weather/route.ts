import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ message: 'City parameter is required' }, { status: 400 });
  }

  try {
    const response = await api.get('/weather', {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        status === 404
          ? 'City not found'
          : error.response?.data?.message || 'Failed to fetch weather data';
      return NextResponse.json({ message }, { status });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}