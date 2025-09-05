
using weatherService.Dtos;
using weatherService.Entity;

namespace weatherService.Mappers
{
    public static class WeatherMapper
    {
        public static WeatherDto toWeatherDto(this WeatherEntity weatherEntity)
        {
            return new WeatherDto
            {
                Id = weatherEntity.Id,
                TemperatureMax = weatherEntity.TemperatureMax,
                TemperatureMin = weatherEntity.TemperatureMin,
                RecordedAt = weatherEntity.RecordedAt,
                City = weatherEntity.City,
            };
        }
    }
}