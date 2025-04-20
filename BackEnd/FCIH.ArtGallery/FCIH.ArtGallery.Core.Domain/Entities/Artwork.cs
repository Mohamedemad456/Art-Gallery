using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Artwork : BaseAuditableEntity<Guid>
	{
		public required string Title { get; set; }
		public string? Description { get; set; }
		public required decimal Price { get; set; }
		public required string ImageUrl { get; set; }
		public Category Category { get; set; }


		public Guid ArtistId { get; set; }

		public bool IsApproved { get; set; }

		// Navigation
		public Artist Artist { get; set; } = default!;
		public Auction? Auction { get; set; }
	}
}
