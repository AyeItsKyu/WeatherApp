using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using weatherService.Configurations;
using weatherService.Dtos;

namespace weatherService.Clients
{
    public class WeatherClient : IWeatherClient
    {
        private readonly WeatherApiConfig _config;

        private readonly HttpClient _httpClient;
        public WeatherClient(HttpClient httpClient, IOptions<WeatherApiConfig> options)
        {
            _httpClient = httpClient;
            _config = options.Value;
        }
        public async Task<CityDto?> GetCityDataAsync(string city)
        {
            var url = _config.CityDataUrl;
            url = url.Replace("{city}", city);

            using HttpResponseMessage response = await _httpClient.GetAsync(url);

            try
            {
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException)
            {
                return null;
            }

            string responseBody = await response.Content.ReadAsStringAsync();
            JObject data = JObject.Parse(responseBody);
            
            if (data["results"] == null)
            {
                return null; 
            }

            return new CityDto
            {
                Name = data["results"][0]["name"].ToString() ?? string.Empty,
                Country = data["results"][0]["country"].ToString() ?? string.Empty,
                Lat = data["results"][0]["lat"]?.Value<double>() ?? 0.0,
                Lon = data["results"][0]["lon"]?.Value<double>() ?? 0.0
            };
        }

        public async Task<WeatherResponseDto?> GetWeatherByCityDto(CityDto dto)
        {
            var url = _config.WeatherByCoordUrl;
            url = url.Replace("{lat}", dto.Lat.ToString(CultureInfo.InvariantCulture))
                .Replace("{lon}", dto.Lon.ToString(CultureInfo.InvariantCulture))
                .Replace("{apiKey}", _config.ApiKey.ToString());

            using HttpResponseMessage response = await _httpClient.GetAsync(url);

            try
            {
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException)
            {
                return null;
            }
            
            string responseBody = await response.Content.ReadAsStringAsync();
            JObject data = JObject.Parse(responseBody);

            if (data == null || data.ContainsKey("error"))
            {
                return null; 
            }

            return new WeatherResponseDto
            {
                City = dto.Name,
                Country = dto.Country,
                TemperatureMax = Convert.ToDecimal(data["data_day"]["temperature_max"][0]),
                TemperatureMin = Convert.ToDecimal(data["data_day"]["temperature_min"][0]),
                Latitude = Convert.ToDecimal(data["metadata"]["latitude"]),
                Longitude = Convert.ToDecimal(data["metadata"]["longitude"]),
                RecordedAt = DateTime.UtcNow
            };
        }
    }
}