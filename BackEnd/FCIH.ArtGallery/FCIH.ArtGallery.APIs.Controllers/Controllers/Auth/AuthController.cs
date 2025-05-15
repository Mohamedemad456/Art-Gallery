using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs;
using FCIH.ArtGallery.Core.Application.Services;
using FCIH.ArtGallery.Core.Application.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Auth
{
	public class AuthController(IServiceManager serviceManager) : ApiControllerBase
	{

		[HttpPost("register")] // POST: /api/auth/register
		[AllowAnonymous]
		public async Task<ActionResult<AuthResponseDto>> Register([FromForm] RegisterRequestDto model)
		{
			var response = await serviceManager.AuthService.RegisterAsync(model);
			return Ok(response);
		}

		[HttpPost("login")] // POST: /api/auth/login
		[AllowAnonymous]
		public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto model)
		{
			var response = await serviceManager.AuthService.LoginAsync(model);
			return Ok(response);
		}

		[HttpPost("logout")] // POST: /api/auth/logout
		[Authorize]
		public async Task<ActionResult> Logout()
		{
			await serviceManager.AuthService.LogoutAsync(Response);
			return Ok();
		}

		

		[HttpGet("me")] // GET: /api/auth/me
		[Authorize]
		public async Task<ActionResult<AuthResponseDto>> GetCurrentUser()
		{
			var result = await serviceManager.AuthService.GetCurrentUser(User);

			return Ok(result);
		}

		[HttpGet("emailexists")] // GET: /api/auth/emailexists?email=
		[AllowAnonymous]
		public async Task<ActionResult<bool>> CheckEmailExist(string email)
		{
			return Ok(await serviceManager.AuthService.EmailExists(email));
		}


		[HttpPost("refresh-token")] // POST: /api/auth/refresh-token
		[AllowAnonymous]

		public async Task<ActionResult<RefreshTokenResponseDto>> RefreshToken()
		{
			var response = await serviceManager.AuthService.RefreshTokenAsync(Request);
			return Ok(response);
		}


		

	}
}
