using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtworkDetailsDto
	{
		public required Guid Id { get; set; }
		public required string Title { get; set; }
		public required string Description { get; set; }
		public required decimal StartingPrice { get; set; }
		public required DateTime AuctionStart { get; set; }
		public required DateTime AuctionEnd { get; set; }
		public required string CategoryName { get; set; }
		public required List<string> Tags { get; set; }
		public required string ImageUrl { get; set; }
		public required  string ApprovalStatus { get; set; }
	}
}
