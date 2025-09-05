using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weatherService.Configurations
{
    public class WeatherApiConfig
    {
        public string ApiKey { get; set; } = string.Empty;
        public string CityDataUrl { get; set; } = string.Empty;
        public string WeatherByCoordUrl { get; set; } = string.Empty;
    }
}