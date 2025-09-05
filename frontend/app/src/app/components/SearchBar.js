"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [city, setCity] = useState("");
    const router = useRouter();

    const getWeather = (city_name) => {
        if (!city_name || city_name.trim() === "") return;
        router.push(`/city/${encodeURIComponent(city_name.trim())}`);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 name='title' className="text-5xl pt-4">Weather App</h1>
            <p className="pb-2" >Check the weather in your prefered city</p>
        
            <div nanme="search-bar" className="rounded flex flex-row items-center gap-2 pb-2">
                <label htmlFor="city">Enter city name:</label>
                <input
                    className="block tracking-wide text-blue-500 w-28 max-w-xs"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="e.g., New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button 
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" 
                    type="button" 
                    onClick={() => getWeather(city)}>
                    Get weather
                </button>
            </div>
            
        </div>
    );
}