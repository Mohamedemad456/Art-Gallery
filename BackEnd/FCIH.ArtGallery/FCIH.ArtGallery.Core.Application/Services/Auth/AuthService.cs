using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs;
using FCIH.ArtGallery.Core.Application.Exceptions;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services.Auth
{
	public class AuthService(
		IOptions<JwtSettings> jwtSettings,
		RoleManager<IdentityRole<Guid>> roleManager,
		UserManager<User> userManager,
		SignInManager<User> signInManager,
		IUnitOfWork unitOfWork,
		IHttpContextAccessor httpContextAccessor) : IAuthService
	{

		private readonly JwtSettings _jwtSettings = jwtSettings.Value;
		public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto model)
		{
			

			var existingUser = await userManager.FindByEmailAsync(model.Email);
			if (existingUser != null)
				throw new BadRequestException("This email is already in use.");

			if (!await roleManager.RoleExistsAsync(model.Role))
				throw new Exception($"Role '{model.Role}' does not exist.");

			var user = new User
			{
				DisplayName = model.DisplayName,
				Email = model.Email,
				UserName = model.UserName,
				EmailConfirmed = true
			};


			var result = await userManager.CreateAsync(user, model.Password);
			if (!result.Succeeded)
				throw new Exception(string.Join("; ", result.Errors.Select(e => e.Description)));

			await userManager.AddToRoleAsync(user, model.Role);



			switch (model.Role.ToLower())
			{
				case "artist":
					var artistRepo = unitOfWork.GetRepository<Artist, Guid>();
					await artistRepo.AddAsync(new Artist
					{
						Id = Guid.NewGuid(),
						UserId = user.Id,
						ApprovalStatus = ApprovalStatus.Pending,
						IsDeleted = false,
						Bio = model.Bio,
						Name = model.DisplayName,
						ProfilePictureUrl = model.ProfilePictureUrl

					});
					break;

				case "buyer":
					var buyerRepo = unitOfWork.GetRepository<Buyer, Guid>();
					await buyerRepo.AddAsync(new Buyer
					{
						Id = Guid.NewGuid(),
						UserId = user.Id,
						IsDeleted = false,
						Name = model.DisplayName
					});
					break;

				default:
					throw new BadRequestException($"Role '{model.Role}' is not supported.");


			}
			await unitOfWork.CompleteAsync();

			var accessToken = await GenerateAccessToken(user, model.Role);
			SetRefreshTokenInCookie(user);

			return new AuthResponseDto
			{
				AccessToken = accessToken,
				DisplayName = user.DisplayName,
				Email = user.Email!,
				Role = model.Role,
				Id = user.Id,
			};

		}
		public async Task<AuthResponseDto> LoginAsync(LoginRequestDto model)
		{
			var user = await userManager.FindByEmailAsync(model.Email);

			if (user is null) throw new UnAuthorizedException("Invalid Login");

			if (user.UserProfile is Artist artist)
			{
				if (artist.ApprovalStatus == ApprovalStatus.Pending)
					throw new UnAuthorizedException("Your account is under review.");
				if (artist.ApprovalStatus == ApprovalStatus.Rejected)
					throw new UnAuthorizedException("Your account has been rejected");
			}
			
			



			var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: true);




			if (result.IsNotAllowed) throw new UnAuthorizedException("Account not confirmed yet.");

			if (result.IsLockedOut) throw new UnAuthorizedException("Account is Locked.");

			if (!result.Succeeded) throw new UnAuthorizedException("Invalid Login");

			var roles = await userManager.GetRolesAsync(user);
			var role = roles.FirstOrDefault() ?? throw new UnAuthorizedException("User has no role");



			var accessToken = await GenerateAccessToken(user, role);
			SetRefreshTokenInCookie(user);

			var response = new AuthResponseDto()
			{
				AccessToken = accessToken,
				DisplayName = user.DisplayName,
				Email = user.Email!,
				Role = role,
				Id = user.Id,
			};

			return response;

		}


		public Task LogoutAsync(HttpResponse response)
		{
			if (response.HttpContext.Request.Cookies.ContainsKey("refreshToken"))
			{
				response.Cookies.Delete("refreshToken");

			}

			return Task.CompletedTask;
		}

		public async Task<AuthResponseDto> GetCurrentUser(ClaimsPrincipal claimsPrincipal)
		{

			var email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);

			var user = await userManager.FindByEmailAsync(email!);

			if (user is null) throw new NotFoundException("User", email!);

			var role = (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? throw new UnAuthorizedException("User has no role");

			return new AuthResponseDto()
			{
				Id = user!.Id,
				Email = user!.Email!,
				DisplayName = user.DisplayName,
				Role = role,
				AccessToken = await GenerateAccessToken(user, role)

			};
		}


		public async Task<bool> EmailExists(string email)
		{
			return await userManager.FindByEmailAsync(email) is not null;
		}

		public async Task<RefreshTokenResponseDto> RefreshTokenAsync(HttpRequest request)
		{

			var refreshToken = request.Cookies["refreshToken"];
			if (string.IsNullOrEmpty(refreshToken))
				throw new Exception("No refresh token found.");

			var principal = GetPrincipalFromExpiredToken(refreshToken);
			if (principal == null)
				throw new Exception("Invalid refresh token.");

			var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (userId == null)
				throw new Exception("User not found in token.");

			var user = await userManager.FindByIdAsync(userId);
			if (user == null)
				throw new Exception("User not found.");

			var roles = await userManager.GetRolesAsync(user);
			var role = roles.FirstOrDefault() ?? throw new Exception("User has no role");

			var newAccessToken = await GenerateAccessToken(user, role);
			SetRefreshTokenInCookie(user);

			var response = new RefreshTokenResponseDto
			{
				AccessToken = newAccessToken
			};

			return response;
		}





		#region Helper Methods
		private async Task<string> GenerateAccessToken(User user, string role)
		{
			var PrivateClaims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email!),
			new Claim(ClaimTypes.Role, role.ToString()),
			new Claim(ClaimTypes.GivenName, user.DisplayName),

		}.Union(await userManager.GetClaimsAsync(user)).ToList();

			//var roles = await userManager.GetRolesAsync(user);


			//foreach (var role in roles)
			//	PrivateClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));

			var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
			var creds = new SigningCredentials(authKey, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _jwtSettings.Issuer,
				audience: _jwtSettings.Audience,
				claims: PrivateClaims,
				expires: DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpirationMinutes),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private void SetRefreshTokenInCookie(User user)
		{
			var refreshToken = GenerateRefreshToken(user);

			httpContextAccessor.HttpContext?.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				SameSite = SameSiteMode.Strict,
				Expires = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpirationDays)
			});
		}

		private string GenerateRefreshToken(User user)
		{
			var claims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email!),

		};

			var rkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
			var creds = new SigningCredentials(rkey, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _jwtSettings.Issuer,
				audience: _jwtSettings.Audience,
				claims: claims,
				expires: DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpirationDays),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
		{
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = true,
				ValidAudience = _jwtSettings.Audience,
				ValidateIssuer = true,
				ValidIssuer = _jwtSettings.Issuer,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)),
				ValidateLifetime = false,
				ClockSkew = TimeSpan.Zero
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			try
			{
				var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
				if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				{
					throw new SecurityTokenException("Invalid token");
				}
				return principal;
			}
			catch
			{
				return null;
			}
		}

		#endregion
	}
}
