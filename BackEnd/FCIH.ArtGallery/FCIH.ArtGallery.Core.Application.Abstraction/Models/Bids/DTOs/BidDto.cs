using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs
{
	public class BidDto
	{
		public required string BuyerName { get; set; }
		public decimal Amount { get; set; }
		public DateTime CreatedAt { get; set; }
	}
}
