"use client";

import { useEffect, useState } from "react";

export default function WeatherData({ city_name }) {
    const [ city, setCity ] = useState(null);
    const [ weather, setWeather ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(city_name)}&count=1&itemsPerPage=1&apikey=DEMOKEY`);
                if (!response.ok) {
                    throw new Error('Failed to fetch location data');
                }
                let cityData = await response.json();
                cityData = cityData.results[0];
                setCity(cityData);
                
                
                const weatherResponse = await fetch(`https://my.meteoblue.com/packages/basic-day?apikey=kaRHuQ5dLYAIO2So&lat=${cityData.lat}&lon=${cityData.lon}&format=json`);
                if (!weatherResponse.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData = await weatherResponse.json();
                setWeather(weatherData.data_day);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchData();
    }, [city_name]);

    if (error) return <p>Error: {error}</p>;
    if (!city || !weather) return <p>Loading...</p>;

  return (
    <div>
        <div key = {city.id}>
            <p>Weather for {new Date().toLocaleDateString("NL")}</p>
            <p>City: {city.name}</p>
            <p>Country: {city.country}</p>
            <p>lat: {city.lat}</p>
            <p>lon: {city.lon}</p>
            <p>Max felttemperature: {weather.felttemperature_max[0]}</p>
            <p>Min felttemperature: {weather.felttemperature_min[0]}</p>
        </div>
    </div>
  );
}