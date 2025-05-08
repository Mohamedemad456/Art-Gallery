using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs
{
	public class RefreshTokenResponseDto
	{
		public required string AccessToken { get; set; }
	}
}
