using Microsoft.EntityFrameworkCore;
using DropSpot.Models;

namespace DropSpot.Data
{
    public class ApplicationDbContext : ApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<DropSpot> DropSpots { get; set; }

        public DbSet<Meetup> Meetups { get; set; }
    }
}