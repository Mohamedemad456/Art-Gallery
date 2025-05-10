using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth.DTOs;
using FCIH.ArtGallery.Core.Application.Services.Auth;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace FCIH.ArtGallery.APIs.Extensions
{
	public static class IdentityExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.Configure<JwtSettings>(configuration.GetSection("JWTSettings"));

			services.AddIdentity<User, IdentityRole<Guid>>((identityOptions) =>
			{
				

				identityOptions.User.RequireUniqueEmail = true;
				identityOptions.Lockout.AllowedForNewUsers = true;
				identityOptions.SignIn.RequireConfirmedEmail = true;
				//identityOptions.Lockout.MaxFailedAccessAttempts = 5;
				//identityOptions.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(12);

				identityOptions.Password.RequireNonAlphanumeric = false; // $#@%
				identityOptions.Password.RequiredLength = 6;
				identityOptions.Password.RequireDigit = false;
				identityOptions.Password.RequireLowercase = false;
				identityOptions.Password.RequireUppercase = false;

				//identityOptions.Stores
				//identityOptions.Tokens
				//identityOptions.ClaimsIdentity

			})
				.AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

			services.AddAuthentication((authenticationOptions) =>
			{
				authenticationOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				authenticationOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
				.AddJwtBearer((options) =>
				{

					var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();
					var key = Encoding.UTF8.GetBytes(jwtSettings!.SecretKey);

					options.TokenValidationParameters = new TokenValidationParameters()
					{
						ValidateAudience = true,
						ValidateIssuer = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						
						ValidAudience = jwtSettings.Audience,
						
						ValidIssuer = jwtSettings.Issuer,

						RoleClaimType = ClaimTypes.Role,

						IssuerSigningKey = new SymmetricSecurityKey(key),

						ClockSkew = TimeSpan.Zero

					};
					


					// allow cookies

					options.Events = new JwtBearerEvents
					{
						OnMessageReceived = context =>
						{
							if (context.Request.Cookies.ContainsKey("refreshToken"))
							{
								context.Token = context.Request.Cookies["refreshToken"];
							}
							return Task.CompletedTask;
						}
					};

				});


			services.AddScoped(typeof(IAuthService), typeof(AuthService));

			services.AddScoped(typeof(Func<IAuthService>), (serviceProvider) =>
			{
				return () => serviceProvider.GetRequiredService<IAuthService>();
			});



			

			return services;

		}
	}

}
