using Microsoft.AspNetCore.Mvc;
using DropSpot.Models;
using DropSpot.Data;
using System.Collections.Generic;
using System.Linq;

namespace DropSpot.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MeetupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MeetupController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("schedule")]
        public IActionResult ScheduleMeetup(MeetupController meetup)
        {
            _context.Add(meetup);
            _context.SaveChanges();
            return Ok(meetup);
        }

        [HttpGet]
        public IEnumerable<Meetup> GetMeetups()
        {
            return _context.GetMeetups;
        }
    }
}