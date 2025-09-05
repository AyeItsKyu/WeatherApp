using Microsoft.AspNetCore.Mvc;
using weatherService.Clients;
using weatherService.Data;
using weatherService.Mappers;
using weatherService.Services.Weather;

namespace weatherService.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        private readonly IWeatherService _weatherService;
        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var weathers = _weatherService.GetWeathers();
            return Ok(weathers);
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> GetByCity([FromRoute] string city)
        {
            var weather_response_dto = await _weatherService.GetWeatherByCityAsync(city);
            return Ok(weather_response_dto);
        }

    }
}