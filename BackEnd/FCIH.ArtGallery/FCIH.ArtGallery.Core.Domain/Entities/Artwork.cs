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

		public required ApprovalStatus ApprovalStatus { get; set; }

		public Guid CategoryId { get; set; }
		public virtual Category Category { get; set; } = default!;


		public Guid ArtistId { get; set; }
		public virtual Artist Artist { get; set; } = default!;


		// Navigation
		public virtual Auction? Auction { get; set; }
		public virtual ICollection<ArtworkTag> ArtworkTags { get; set; } = new HashSet<ArtworkTag>();

	}
}
