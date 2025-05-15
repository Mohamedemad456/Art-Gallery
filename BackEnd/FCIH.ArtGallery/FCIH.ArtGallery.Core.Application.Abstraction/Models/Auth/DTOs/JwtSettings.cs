using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs
{
	public class JwtSettings
	{
		public required string SecretKey { get; set; } 
		public required string Issuer { get; set; }
		public required string Audience { get; set; }
		public required double AccessTokenExpirationMinutes { get; set; }
		public required double RefreshTokenExpirationDays { get; set; }
	}
}
