using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs
{
	public class WinnerBidDto
	{
		public Guid BuyerId { get; set; }
		public required string BuyerFullName { get; set; }
		public decimal Amount { get; set; }
		public DateTime BidTime { get; set; }
	}
}
