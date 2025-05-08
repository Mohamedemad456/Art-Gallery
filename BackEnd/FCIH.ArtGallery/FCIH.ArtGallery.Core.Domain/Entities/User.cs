using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class User : IdentityUser<Guid>
	{

		public required string DisplayName { get; set; }

		// Navigation
		public virtual UserProfile? UserProfile { get; set; }
	}
}
