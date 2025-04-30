using FCIH.ArtGallery.Core.Domain._Common;
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

		public bool IsApproved { get; set; } = false;

		// Navigation
		public virtual ICollection<Artwork> Artworks { get; set; } = new HashSet<Artwork>();
	}
}
