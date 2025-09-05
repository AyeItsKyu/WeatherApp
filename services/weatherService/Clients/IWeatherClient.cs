using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using weatherService.Dtos;

namespace weatherService.Clients
{
    public interface IWeatherClient
    {
        Task<CityDto?> GetCityDataAsync(string city);
        Task<WeatherResponseDto?> GetWeatherByCityDto(CityDto cto);
    }
}