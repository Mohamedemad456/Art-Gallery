using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Bid : BaseAuditableEntity<Guid>
	{
		public required decimal Amount { get; set; }
		public required DateTime TimePlaced { get; set; }

		public required Guid AuctionId { get; set; }
		public virtual Auction Auction { get; set; } = default!;


		public required Guid BuyerId { get; set; }
		public virtual Buyer Buyer { get; set; } = default!;
	}
}
