using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtistCreateArtworkDto
	{
		public required string Title { get; set; }
		public required string Description { get; set; }

		public required decimal Price { get; set; }

		public required Guid CategoryId { get; set; }
		public required List<Guid> Tags { get; set; }
		public required IFormFile Image { get; set; }

		public AuctionCreateDto? Auction { get; set; }
	}
}
