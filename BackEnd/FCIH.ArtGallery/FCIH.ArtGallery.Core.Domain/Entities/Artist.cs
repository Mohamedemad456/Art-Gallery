using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Artist : UserProfile
	{
		public string? Bio { get; set; }
		public string? ProfilePictureUrl { get; set; }


		public ApprovalStatus? ApprovalStatus { get; set; }

		// Navigation
		public virtual ICollection<Artwork> Artworks { get; set; } = new HashSet<Artwork>();
	}
}
