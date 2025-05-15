using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs
{
	public class MyArtworksWithFiltersSpec : BaseSpecifications<Artwork, Guid>
	{
		public MyArtworksWithFiltersSpec(Guid artistId, int PageSize, int PageIndex, string? title, string? Status,Guid? categoryId, List<Guid>? tagIds)
			: base(a =>
						a.ArtistId == artistId
				&&
						(string.IsNullOrEmpty(title) || a.Title.Contains(title))
				&&
						(!categoryId.HasValue || a.CategoryId == categoryId.Value)
				&&
						(tagIds == null || tagIds.Count == 0 || a.ArtworkTags!.Any(at => tagIds.Contains(at.TagId)))
				&&
				(string.IsNullOrEmpty(Status) || a.ApprovalStatus.ToString().Contains(Status)))
		{

			ApplyPagination((PageIndex - 1) * PageSize, PageSize);
			AddOrderByDesc(a => a.CreatedAt);
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();
			Includes.Add(a => a.Category);
			Includes.Add(a => a.Auction!.Bids);
			Includes.Add(a => a.ArtworkTags.Select(at => at.Tag));
		}
	}
}
