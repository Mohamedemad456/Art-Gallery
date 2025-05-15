using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class ArtworkTag
	{
		public Guid ArtworkId { get; set; }
		public virtual Artwork Artwork { get; set; } = default!;

		public Guid TagId { get; set; }
		public virtual Tag Tag { get; set; } = default!;
	}
}
