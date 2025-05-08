using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;
using FCIH.ArtGallery.Core.Application.Abstraction.Logging;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Initializers
{
	internal sealed class StoreIdentityDbInitializer(AppDbContext _context, UserManager<User> _userManager, RoleManager<IdentityRole<Guid>> _roleManager, ILoggerManager _logger) : DbInitializer(_context), IStoreIdentityDbInitializer 
	{


		public override async Task SeedAsync()
		{
			await SeedRolesAsync();
			await SeedAdminUserAsync();
			await SeedArtistUserAsync();
			await SeedBuyerUserAsync();
		}

		private async Task SeedRolesAsync()
		{
			string[] roles = ["Admin", "Artist", "Buyer"];

			foreach (var role in roles)
			{
				if (!await _roleManager.RoleExistsAsync(role))
				{
					var result = await _roleManager.CreateAsync(new IdentityRole<Guid>(role));
					if (result.Succeeded)
						_logger.LogInfo($"Role '{role}' created.");
					else
						_logger.LogError($"Failed to create role '{role}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
				}
				else
				{
					_logger.LogInfo($"Role '{role}' already exists.");
				}
			}
		}

		private async Task SeedAdminUserAsync()
		{
			const string email = "admin@artgallery.com";
			const string password = "Admin123!";

			var user = await _userManager.FindByEmailAsync(email);
			if (user is not null)
			{
				_logger.LogInfo("Admin user already exists.");
				return;
			}

			var adminUser = new User
			{
				DisplayName = "Amr Mohamed",
				UserName = "amr.mohamed",
				Email = email,
				EmailConfirmed = true
			};

			var result = await _userManager.CreateAsync(adminUser, password);

			if (!result.Succeeded)
			{
				_logger.LogError("Failed to create admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
				return;
			}

			await _userManager.AddToRoleAsync(adminUser, "Admin");

			var profile = new Admin
			{
				Id = Guid.NewGuid(),
				Name = adminUser.DisplayName,
				UserId = adminUser.Id,
				IsDeleted = false,
			};

			_context.UserProfiles.Add(profile);
			await _context.SaveChangesAsync();

			_logger.LogInfo("Default admin user created successfully.");
		}

		private async Task SeedArtistUserAsync()
		{
			const string email = "artist@artgallery.com";
			const string password = "Artist123!";

			var user = await _userManager.FindByEmailAsync(email);
			if (user is not null)
			{
				_logger.LogInfo("Artist user already exists.");
				return;
			}

			var artistUser = new User
			{
				DisplayName = "Picasso",
				UserName = "picasso",
				Email = email,
				EmailConfirmed = true
			};

			var result = await _userManager.CreateAsync(artistUser, password);

			if (!result.Succeeded)
			{
				_logger.LogError("Failed to create artist user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
				return;
			}

			await _userManager.AddToRoleAsync(artistUser, "Artist");

			var profile = new Artist
			{
				Id = Guid.Parse("10ad4851-7723-4746-95bb-fbb1c625085e"),
				Name = artistUser.DisplayName,
				UserId = artistUser.Id,
				Bio = "Default artist bio",
				IsDeleted = false,
				ApprovalStatus = ApprovalStatus.Accepted
			};

			_context.UserProfiles.Add(profile);
			await _context.SaveChangesAsync();

			_logger.LogInfo("Artist user seeded.");
		}

		private async Task SeedBuyerUserAsync()
		{
			const string email = "buyer@artgallery.com";
			const string password = "Buyer123!";

			var user = await _userManager.FindByEmailAsync(email);
			if (user is not null)
			{
				_logger.LogInfo("Buyer user already exists.");
				return;
			}

			var buyerUser = new User
			{
				DisplayName = "Default Buyer",
				UserName = "default.buyer",
				Email = email,
				EmailConfirmed = true
			};

			var result = await _userManager.CreateAsync(buyerUser, password);

			if (!result.Succeeded)
			{
				_logger.LogError("Failed to create buyer user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
				return;
			}

			await _userManager.AddToRoleAsync(buyerUser, "Buyer");

			var profile = new Buyer
			{
				Id = Guid.Parse("32bca3de-cc8e-43ea-9b05-226d3a82d53d"),
				Name = buyerUser.DisplayName,
				UserId = buyerUser.Id,
				IsDeleted = false,
				
			};

			_context.UserProfiles.Add(profile);
			await _context.SaveChangesAsync();

			_logger.LogInfo("Buyer user seeded.");
		}
	}

}

