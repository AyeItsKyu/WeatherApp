using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weatherService.Dtos
{
    public class WeatherDto
    {
        public int Id { get; set; }
        public decimal TemperatureMax { get; set; }
        public decimal TemperatureMin { get; set; }
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
    }
}