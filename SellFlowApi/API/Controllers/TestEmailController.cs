using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/testemail")]
public class TestEmailController : ControllerBase
{
    private readonly IEmailSender _emailSender;
    private readonly ILogger<TestEmailController> _logger;

    public TestEmailController(
        IEmailSender emailSender,
        ILogger<TestEmailController> logger)
    {
        _emailSender = emailSender;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> SendTestEmail([FromQuery] string emailAddress)
    {
        try
        {
            await _emailSender.SendEmailAsync(
                emailAddress,
                "Test Email from SellFlow",
                "<strong>This is a test email!</strong> If you see this, SendGrid is working."
            );

            _logger.LogInformation($"Test email sent to {emailAddress}");
            return Ok($"Email sent to {emailAddress}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send test email");
            return BadRequest($"Failed to send email: {ex.Message}");
        }
    }
}