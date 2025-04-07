using System;
using API.Dtos;
using API.Entities;
using AutoMapper;
using Google.Apis.Drive.v3.Data;
using Microsoft.Win32;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, AppUserDto>();
        CreateMap<RegisterDto, AppUser>(); 
    }
}
