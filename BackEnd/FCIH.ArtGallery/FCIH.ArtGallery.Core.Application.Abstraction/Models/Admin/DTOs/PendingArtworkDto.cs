using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs
{
	public class PendingArtworkDto
	{
			public required Guid Id { get; set; }
			public required string Title { get; set; }


		public required decimal Price { get; set; }
		public required string ImageUrl { get; set; }
		public required string ArtistName { get; set; }
			public required string ApprovalStatus { get; set; }
		
	}
}
