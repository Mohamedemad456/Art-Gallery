using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FCIH.ArtGallery.APIs.Extensions
{
	public static class IdentityExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
		{
			//services.Configure<JwtSettings>(configuration.GetSection("JWTSettings"));

			services.AddIdentity<User, IdentityRole<Guid>>((identityOptions) =>
			{
				

				identityOptions.User.RequireUniqueEmail = true;
				identityOptions.Lockout.AllowedForNewUsers = true;
				identityOptions.Lockout.MaxFailedAccessAttempts = 5;
				identityOptions.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(12);

				//identityOptions.Stores
				//identityOptions.Tokens
				//identityOptions.ClaimsIdentity

			})
				.AddEntityFrameworkStores<AppDbContext>();

			//services.AddAuthentication((authenticationOptions) =>
			//{
			//	authenticationOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			//	authenticationOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			//})
			//	.AddJwtBearer((options) =>
			//	{
			//		options.TokenValidationParameters = new TokenValidationParameters()
			//		{
			//			ValidateAudience = true,
			//			ValidateIssuer = true,
			//			ValidateLifetime = true,
			//			ValidateIssuerSigningKey = true,

			//			ValidAudience = configuration["JwtSettings:Audience"],
			//			ValidIssuer = configuration["JwtSettings:Issuer"],
			//			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!)),
			//			ClockSkew = TimeSpan.Zero

			//		};
			//	});
			return services;

		}
	}

}
