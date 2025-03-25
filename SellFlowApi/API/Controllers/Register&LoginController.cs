using System;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class Register_LoginController
(
    UserManager<AppUser> userManager,
    ITokenService tokenService,
    IMapper mapper
) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto)
    {
        var user = mapper.Map<AppUser>(registerDto);
        var result = await userManager.CreateAsync(user, registerDto.Password);
        if(!result.Succeeded) return BadRequest(result.Errors);

         return new AppUserDto
         {
             Username = user.UserName ?? "",
             Token = await tokenService.CreateToken(user),
             Gender = registerDto.Gender, 
             city = registerDto.city,     
             Country = registerDto.Country, 
             PhoneNumber = user.PhoneNumber ?? "", 
             Email =user.Email ?? ""
         };
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login (LoginDto loginDto)
    {
        var user = await userManager.Users
            .FirstOrDefaultAsync(x =>
                x.NormalizedEmail == loginDto.Email.ToUpper());
        if (user == null || user.Email == null)
        {
            return Unauthorized("Invalid username");
        }

        var result = await userManager.CheckPasswordAsync(user,loginDto.Password);
        if(!result) return Unauthorized();

        return new AppUserDto
        {
            Username = user.UserName ?? "",
            Token =await tokenService.CreateToken(user),
            Gender = user.Gender,
            Email = user.Email,
            city = user.city,
            Country = user.Country,
            PhoneNumber = user.PhoneNumber ?? "",
        };
    }

    
}
