"use client";

import { useEffect, useState } from "react";

export default function WeatherData({ city_name }) {
    const [ city, setCity ] = useState(null);
    const [ weather, setWeather ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const weatherResponse = await fetch(`/api/weather/${city_name}`);
                if (!weatherResponse.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData = await weatherResponse.json();
                setWeather(weatherData);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchData();
    }, [city_name]);

    if (error) 
    {
        return <p className="text-center bg-red-500 animate-bounce">We could not retrieve the city's weather data.</p>;
    } 
            
    if (!weather) 
    {
        return (
            <div className="flex flex-col items-center justify-center my-[20%]">
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:.7s]"></div>
                </div>
                <p className="text-center text-blue-400"> Loading</p>
            </div>
        )
    }

  return (
    <div className="grid grid-cols-3 justify-items-center">
        <fieldset className="col-start-2 border border-blue-400 rounded-lg mb-4 pt-5 pb-10 px-4 w-140 flex flex-col items-center">
            <legend className="font-semibold mb-2 text-4xl text-center align-center mx-auto px-4">{weather.city}</legend>
            <div className="flex flex-col text-blue-400 items-center justify-center">
                <div className="text-center text-3xl" key = {weather.id}>
                    <p>Weather for {new Date().toLocaleDateString("NL")}</p>
                    <p>Country: {weather.country}</p>
                    <p>lat: {weather.latitude}</p>
                    <p>lon: {weather.longitude}</p>
                    <p>Max felttemperature: {weather.temperatureMax}</p>
                    <p>Min felttemperature: {weather.temperatureMin}</p>
                </div>
            </div>
        </fieldset>
    </div>
  );
}
