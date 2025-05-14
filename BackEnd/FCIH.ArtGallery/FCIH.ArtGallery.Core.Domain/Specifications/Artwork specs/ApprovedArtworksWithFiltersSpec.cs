using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs
{
	public class ApprovedArtworksWithFiltersSpec : BaseSpecifications<Artwork, Guid>
	{
		public ApprovedArtworksWithFiltersSpec(int pageSize, int pageIndex, string? title, Guid? categoryId, List<Guid>? tagIds, Guid? artistId)
			: base(a =>
				a.ApprovalStatus == ApprovalStatus.Accepted &&
				(!artistId.HasValue || a.ArtistId == artistId.Value) &&
				(string.IsNullOrEmpty(title) || a.Title.Contains(title)) &&
				(!categoryId.HasValue || a.CategoryId == categoryId.Value) &&
				(tagIds == null || tagIds.All(tid => a.ArtworkTags!.Any(at => at.TagId == tid)))
			)
		{
			ApplyPagination((pageIndex - 1) * pageSize, pageSize);
			AddOrderByDesc(a => a.CreatedAt);
			Includes.Add(a => a.Category);
			Includes.Add(a => a.Artist);
			Includes.Add(a => a.ArtworkTags);
			StringIncludes.Add("ArtworkTags.Tag");
		}
	}
}
