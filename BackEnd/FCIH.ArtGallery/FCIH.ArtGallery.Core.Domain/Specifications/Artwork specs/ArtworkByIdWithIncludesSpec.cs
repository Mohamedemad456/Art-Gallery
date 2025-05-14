using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs
{
	public class ArtworkByIdWithIncludesSpec : BaseSpecifications<Artwork, Guid>
	{
		public ArtworkByIdWithIncludesSpec(Guid artworkId, Guid artistId)
		: base(a => a.Id == artworkId && a.ArtistId == artistId)
		{
			AddIncludes();
			AddOrderByDesc(a => a.CreatedAt);
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(a => a.Category);
			Includes.Add(a => a.ArtworkTags);
			StringIncludes.Add("ArtworkTags.Tag");
			Includes.Add(a => a.Auction!.Bids);
		}

	

	}
}
