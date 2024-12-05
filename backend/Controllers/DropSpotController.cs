using Microsoft.AspNetCore.Mvc;
using DropSpot.Models;
using DropSpot.Data;
using System.Collections.Generic;

namespace DropSpot.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class DropSpotController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DropSpotController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<DropSpot> GetDropSpots()
        {
            return _context.DropSpots;
        }
    }
}