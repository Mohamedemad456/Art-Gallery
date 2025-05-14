using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs
{
	public class BidsByArtworkIdSpec : BaseSpecifications<Bid, Guid>
	{
		public BidsByArtworkIdSpec(Guid artworkId) : base(b => b.Auction.ArtworkId == artworkId)
		{
			AddIncludes();
			AddOrderByDesc(b => b.TimePlaced);
		}
		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(b => b.Buyer);
		}
	}
}
