export default async function WeatherData({ params }) {
    const { city_name } = await params;

    const response = await fetch(`https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(city_name)}&count=1&itemsPerPage=1&apikey=DEMOKEY`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }

    var city = await response.json();
    city = city.results[0];
    console.log(city);

    const weather_reponse = await fetch(`https://my.meteoblue.com/packages/basic-day?apikey=kaRHuQ5dLYAIO2So&lat=${city.lat}&lon=${city.lon}&format=json`);
    if (!weather_reponse.ok) {
        throw new Error('Failed to fetch weather data');
    }
    var weather = await weather_reponse.json();
    console.log(weather.data_day);
    weather = weather.data_day;

    // var date = new Date().now();
    // date = date.for


  return (
    <div>
        <div key = {city.id}>
            <p>Weather for {new Date("DD-MM-YYY")}</p>
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