using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artist_specs
{
	public class PendingArtistsSpecification : BaseSpecifications<Artist, Guid>
	{
		public PendingArtistsSpecification() : base(a => a.ApprovalStatus == ApprovalStatus.Pending)
		{
			AddIncludes();
			AddOrderBy(a => a.Name);
		}
		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(a => a.User);
			Includes.Add(a => a.Artworks);
		}
		
	}
}
