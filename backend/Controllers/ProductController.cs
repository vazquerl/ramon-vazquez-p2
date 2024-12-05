using Microsoft.AspNetCore.Mvc;
using DropSpot.Models;
using DropSpot.Data;
using System.Collections.Generic;

namespace DropSpot.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ProductController> GetProducts()
        {
            return _context.Products;
        }
    }
}