using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs
{
	public class HighestBidWithBuyerSpec : BaseSpecifications<Bid, Guid>
	{
		public HighestBidWithBuyerSpec(Guid artworkId)
			: base(b => b.Auction.ArtworkId == artworkId)
		{
			AddIncludes();

			AddOrderByDesc(b => b.Amount);
			ApplyPagination(0, 1); // Get top bid only
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(b => b.Buyer);
		}
	}
}
