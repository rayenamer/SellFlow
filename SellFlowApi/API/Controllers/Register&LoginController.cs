using System;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace API.Controllers;

public class Register_LoginController
(
    UserManager<AppUser> userManager,
    ITokenService tokenService,
    IMapper mapper,
    IEmailSender _emailSender,
    ILogger<Register_LoginController> _logger
) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto)
    {
        var user = mapper.Map<AppUser>(registerDto);

        var userExist = await userManager.FindByEmailAsync(registerDto.Email);
        if(userExist!=null) return BadRequest("Email already Signed");
        //
        user.EmailConfirmed = !registerDto.requiredEmailConfirmation;
        //
        var result = await userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);


        //
        var emailToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationLink = Url.Action(
        "ConfirmEmail",
        "Register_Login",
        new { userId = user.Id, token = emailToken },
        Request.Scheme
        );


        _ = Task.Run(async () =>
    {
        try
        {
            await _emailSender.SendEmailAsync(
                registerDto.Email,
                "Confirm your email",
                $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>."
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send confirmation email");
        }

        return new AppUserDto
        {
            Username = user.UserName ?? "",
            Token = await tokenService.CreateToken(user),
            Gender = registerDto.Gender,
            city = registerDto.city,
            Country = registerDto.Country,
            PhoneNumber = user.PhoneNumber ?? "",
            Email = user.Email ?? "",
            EmailConfirmed = true // Indicate email needs confirmation
        };

    });
        return Ok(new { Message = "Registration successful. Please check your email." });
    }
    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
            return BadRequest("Invalid request");

        var user = await userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found");

        var result = await userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded) return BadRequest("Confirmation failed");

        return Ok("Email confirmed successfully!");
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
    {
        var user = await userManager.Users
            .FirstOrDefaultAsync(x =>
                x.NormalizedEmail == loginDto.Email.ToUpper());
        _logger.LogInformation($"User: {user?.UserName}, EmailConfirmed: {user?.EmailConfirmed}");
        if (user == null || user.Email == null)
        {
            return Unauthorized("Invalid username");
        }
       
        //if (!user.EmailConfirmed)
        //{
        //    // If the email is not confirmed, reject login attempt
        //    return Unauthorized("Email is not confirmed.");
        //}


        

        var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!result) return Unauthorized();

        return new AppUserDto
        {
            Username = user.UserName ?? "",
            Token = await tokenService.CreateToken(user),
            Gender = user.Gender,
            Email = user.Email,
            city = user.city,
            Country = user.Country,
            PhoneNumber = user.PhoneNumber ?? "",
        };
    }


     


}
