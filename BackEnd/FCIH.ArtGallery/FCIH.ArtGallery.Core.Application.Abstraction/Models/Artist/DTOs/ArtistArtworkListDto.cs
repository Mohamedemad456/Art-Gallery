using FCIH.ArtGallery.Core.Application.Abstraction.Models.Category.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtistArtworkListDto
	{
		public Guid Id { get; set; }
		public required string Title { get; set; }
		public decimal StartingPrice { get; set; }
		public decimal CurrentPrice  { get; set; }
		public DateTime AuctionEnd { get; set; }

		public required List<TagDto> Tags { get; set; }

		public required CategoryDto	 Category { get; set; }
		public required string ApprovalStatus { get; set; }
		public required string ImageUrl { get; set; }
	}
}
