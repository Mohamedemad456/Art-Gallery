using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer.DTOs
{
	public class BuyerProfileDto
	{
		public Guid Id { get; set; }
		public string FullName { get; set; } = default!;
		public string Email { get; set; } = default!;
	}
}
