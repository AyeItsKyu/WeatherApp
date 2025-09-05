using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using weatherService.Clients;
using weatherService.Configurations;
using weatherService.Data;
using weatherService.Services.Weather;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();
builder.Services.AddHttpClient<IWeatherClient, WeatherClient>();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.Configure<WeatherApiConfig>(
    builder.Configuration.GetSection("WeatherApi")
);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.MapControllers();

app.Run();
