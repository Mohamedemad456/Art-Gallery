using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs
{
	public class ArtworkByIdWithBidHistoryIncludesSpec : BaseSpecifications<Artwork, Guid>
	{
		public ArtworkByIdWithBidHistoryIncludesSpec(Guid artworkId)
		: base(a => a.Id == artworkId)
		{
			AddIncludes();
			AddOrderByDesc(a => a.CreatedAt);
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(a => a.Category);
			Includes.Add(a => a.Artist);
			Includes.Add(a => a.ArtworkTags);
			StringIncludes.Add("ArtworkTags.Tag"); 
			Includes.Add(a => a.Auction!.Bids);
		}

	}
}
