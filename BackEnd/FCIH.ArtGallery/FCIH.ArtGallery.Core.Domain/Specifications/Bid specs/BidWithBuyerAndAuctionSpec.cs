using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs
{
	public class BidWithBuyerAndAuctionSpec : BaseSpecifications<Bid, Guid>
	{
		public BidWithBuyerAndAuctionSpec(Guid bidId)
			: base(b => b.Id == bidId)
		{
			AddIncludes();
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();

			Includes.Add(b => b.Buyer);
			Includes.Add(b => b.Auction);
			Includes.Add(b => b.Auction.Artwork);
		}
	}
}
