using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Tag : BaseEntity<Guid>
	{
		public required string Name { get; set; }

		public virtual ICollection<ArtworkTag> ArtworkTags { get; set; } = new HashSet<ArtworkTag>();
	}
}
