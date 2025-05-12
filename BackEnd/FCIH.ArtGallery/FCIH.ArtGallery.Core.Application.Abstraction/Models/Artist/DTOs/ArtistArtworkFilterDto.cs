using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtistArtworkFilterDto
	{
		public string? Title { get; set; }
		public string? ApprovalStatus { get; set; }

		public required List<Guid>? Tags { get; set; }

		public Guid? CategoryId { get; set; }

		public int PageIndex { get; set; } = 1;
		public int PageSize { get; set; } = 10;
	}
}
