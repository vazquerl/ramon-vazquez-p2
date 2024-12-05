namespace DropSpot.Models
{
    public class Meetup
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DropSpotId { get; set; }
        public DateTime ScheduledDateTime { get; set; }
    }
}