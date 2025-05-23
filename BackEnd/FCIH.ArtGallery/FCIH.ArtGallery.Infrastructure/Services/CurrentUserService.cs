﻿using FCIH.ArtGallery.Core.Application.Abstraction.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Services
{
	public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
	{
		private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

		public string? UserId =>
			_httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
	}
}
