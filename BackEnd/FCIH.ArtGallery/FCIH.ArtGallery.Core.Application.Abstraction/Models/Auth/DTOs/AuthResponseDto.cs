﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs
{
	public class AuthResponseDto
	{
		public required Guid Id { get; set; }
		public required string DisplayName { get; set; }
		public required string Email { get; set; }
		public required string Role { get; set; }
		public required string AccessToken { get; set; }
	}
}

