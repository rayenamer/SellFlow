using System;
using API.Data;
using API.Helpers;
using API.interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

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
        services.AddSwaggerGen();
        
        return services;
    }
}
