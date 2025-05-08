using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs
{
	public class RegisterRequestDto
	{
		[Required]
		public required string DisplayName { get; set; }

		[Required]
		public required string UserName { get; set; }

		[Required]
		[EmailAddress]
		public required string Email { get; set; }


		public string? Bio { get; set; }

		public string? ProfilePictureUrl { get; set; }



		[Required]
		[RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
			ErrorMessage = "Password must have 1 Uppercase, 1 Lowercase, 1 number, 1 non alphanumeric and at least 6 characters")]
		public required string Password { get; set; }

		[Required]
		public required string Role { get; set; }
	}
}

