using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth
{
	public interface IAuthService
	{
		Task<AuthResponseDto> LoginAsync(LoginRequestDto model);

		Task<AuthResponseDto> RegisterAsync(RegisterRequestDto model);

		Task<AuthResponseDto> GetCurrentUser(ClaimsPrincipal claimsPrincipal);

		Task<bool> EmailExists(string email);


		Task<RefreshTokenResponseDto> RefreshTokenAsync(HttpRequest request);

		Task LogoutAsync(HttpResponse response);
	}
}
