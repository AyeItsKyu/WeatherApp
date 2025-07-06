"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [city, setCity] = useState("");
    const router = useRouter();

    const getWeather = (city_name) => {
        if (!city_name || city_name.trim() === "") return;
        router.push(`/${city_name}`);
    };

    return (
        <div>
        <h1>Weather App</h1>
        <p>Check the weather in your prefered city</p>
    
        <label htmlFor="city">Enter city name:
            <input
                type="text"
                id="city"
                name="city"
                placeholder="e.g., New York"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </label>
        <button type="button" onClick={() => getWeather(city)}>
            Get Weather
        </button>
        </div>
    );
}