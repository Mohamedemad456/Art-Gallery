using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs
{
	public class PendingArtworksSpecification : BaseSpecifications<Artwork, Guid>
	{

		public PendingArtworksSpecification(int pageSize, int pageIndex)
	   : base(artwork => artwork.ApprovalStatus == ApprovalStatus.Pending)
		{
			AddIncludes();
			AddOrderBy(a => a.CreatedAt);


			ApplyPagination(pageSize* (pageIndex - 1), pageSize);
		}
		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(a => a.Artist);
			Includes.Add(a => a.Category);
			Includes.Add(a => a.ArtworkTags);
		}

	}
		
	
}
