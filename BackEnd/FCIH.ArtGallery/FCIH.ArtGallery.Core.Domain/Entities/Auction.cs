using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Auction : BaseAuditableEntity<Guid>
	{
		public required Guid ArtworkId { get; set; }

		public required DateTime StartTime { get; set; }
		public required DateTime EndTime { get; set; }

		public decimal? FinalPrice { get; set; }

		// Navigation
		public Artwork Artwork { get; set; } = default!;
		public ICollection<Bid> Bids { get; set; } = new HashSet<Bid>();
	}
}
