using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs
{
	public class PendingArtistDto
	{
		public required Guid Id { get; set; }
		public required string Name { get; set; }
		public required string Email { get; set; }
		public required string ApprovalStatus { get; set; }

		public string? Bio { get; set; }
		public string? ProfilePictureUrl { get; set; }
	}
}
