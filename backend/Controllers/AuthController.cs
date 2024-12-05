using Microsoft.AspNetCore.Mvc;
using DropSpot.Models;
using DropSpot.Data;
using System.Linq;

namespace DropSpot.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(uint => u.Username == user.Username && u.Password == user.Password);
            if (existingUser != null)
            {
                return Ok(existingUser);
            }
            return Unauthorized();
        }
    }
}