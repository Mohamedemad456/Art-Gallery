using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtistUpdateArtworkDto
	{
		public required string Title { get; set; } 
		public required string Description { get; set; }
		public decimal StartingPrice { get; set; }
		public DateTime AuctionStart { get; set; }
		public DateTime AuctionEnd { get; set; }
		public Guid CategoryId { get; set; }
		public  List<Guid>? Tags { get; set; }
		public IFormFile? Image { get; set; } // Optional
	}
}
