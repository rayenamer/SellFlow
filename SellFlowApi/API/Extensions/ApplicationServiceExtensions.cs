using System;
using API.Data;
using API.Helpers;
using API.interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
    IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(options =>
    options.UseSqlite("Data Source=app.db"));

        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();


        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
{
    // Add Bearer Token Authorization
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
{
    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
    Name = "Authorization",
    In = ParameterLocation.Header,
    Type = SecuritySchemeType.Http, // Use Http instead of ApiKey for JWT
    Scheme = "Bearer",
    BearerFormat = "JWT"
});

c.AddSecurityRequirement(new OpenApiSecurityRequirement
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        Array.Empty<string>()
    }
});

});


        return services;
    }
}
