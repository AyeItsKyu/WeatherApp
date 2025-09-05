using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using weatherService.Clients;
using weatherService.Data;
using weatherService.Dtos;
using weatherService.Mappers;

namespace weatherService.Services.Weather
{
    public class WeatherService : IWeatherService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IWeatherClient _client;

        public WeatherService(ApplicationDbContext dbContext, IWeatherClient client)
        {
            _dbContext = dbContext;
            _client = client;
        }

        public Task<List<WeatherDto>> GetWeathers()
        {
            var weathers = _dbContext.Weather
                .Select(weather => weather.toWeatherDto())
                .ToListAsync();

            return weathers;
        }

        public async Task<WeatherResponseDto?> GetWeatherByCityAsync(string city)
        {
            var city_dto = await _client.GetCityDataAsync(city);

            if (city_dto == null)
            {
                return null;
            }

            var weather_response_dto = await _client.GetWeatherByCityDto(city_dto);

            if (weather_response_dto == null)
            {
                return null;
            }

            var existing_weather = _dbContext.Weather.FirstOrDefault(w => w.City == city_dto.Name);

            if (existing_weather != null)
            {
                existing_weather.TemperatureMax = weather_response_dto.TemperatureMax;
                existing_weather.TemperatureMin = weather_response_dto.TemperatureMin;
                existing_weather.RecordedAt = weather_response_dto.RecordedAt;
                weather_response_dto.Id = existing_weather.Id;
            }
            else
            {
                var weather_entity = new Entity.WeatherEntity
                {
                    City = weather_response_dto.City,
                    Country = weather_response_dto.Country,
                    TemperatureMax = weather_response_dto.TemperatureMax,
                    TemperatureMin = weather_response_dto.TemperatureMin,
                    Latitude = weather_response_dto.Latitude,
                    Longitude = weather_response_dto.Longitude,
                    RecordedAt = weather_response_dto.RecordedAt
                };

                _dbContext.Weather.Add(weather_entity);

                _dbContext.SaveChanges();

                weather_response_dto.Id = weather_entity.Id;
            }

            return weather_response_dto;
        }
    }
}