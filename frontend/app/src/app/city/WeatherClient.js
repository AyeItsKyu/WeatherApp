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

    if (error) 
    {
        return <p className="text-center bg-red-500 animate-bounce">We could not retrieve the city's weather data.</p>;
    } 
            
    if (!city || !weather) 
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
            <legend className="font-semibold mb-2 text-4xl text-center align-center mx-auto px-4">{city.name}</legend>
            <div className="flex flex-col text-blue-400 items-center justify-center">
                <div className="text-center text-3xl" key = {city.id}>
                    <p>Weather for {new Date().toLocaleDateString("NL")}</p>
                    <p>Country: {city.country}</p>
                    <p>lat: {city.lat}</p>
                    <p>lon: {city.lon}</p>
                    <p>Max felttemperature: {weather.felttemperature_max[0]}</p>
                    <p>Min felttemperature: {weather.felttemperature_min[0]}</p>
                </div>
            </div>
        </fieldset>
    </div>
  );
}
