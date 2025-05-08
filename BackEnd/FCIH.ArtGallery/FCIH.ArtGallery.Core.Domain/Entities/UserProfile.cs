using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public abstract class UserProfile : BaseEntity<Guid>
	{
		public required string Name { get; set; }
		public required Guid UserId { get; set; }
		public virtual User User { get; set; } = default!;
	}
}
