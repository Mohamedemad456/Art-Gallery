using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class ArtistProfileDto
	{
		public required Guid Id { get; set; }
		public required string FullName { get; set; }
		public  string? Bio { get; set; }
		public  string? ProfileImageUrl { get; set; }
	}
}
