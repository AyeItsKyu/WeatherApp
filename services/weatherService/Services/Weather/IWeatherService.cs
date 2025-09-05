using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using weatherService.Dtos;

namespace weatherService.Services.Weather
{
    public interface IWeatherService
    {
        Task<List<WeatherDto>> GetWeathers();
        Task<WeatherResponseDto?> GetWeatherByCityAsync(string city);
    }
}