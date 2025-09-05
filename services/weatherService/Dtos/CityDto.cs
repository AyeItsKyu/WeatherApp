using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weatherService.Dtos
{
    public class CityDto
    {
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}