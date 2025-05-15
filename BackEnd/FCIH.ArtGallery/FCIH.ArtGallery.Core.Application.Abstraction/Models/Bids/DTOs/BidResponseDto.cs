using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs
{
	public class BidResponseDto
	{
		public Guid ArtworkId { get; set; }
		public decimal Amount { get; set; }
		public DateTime CreatedAt { get; set; }
		public required string BuyerName { get; set; }
	}
}
