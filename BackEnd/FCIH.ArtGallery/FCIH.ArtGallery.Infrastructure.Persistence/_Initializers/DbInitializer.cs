using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Initializers
{
	internal abstract class DbInitializer(DbContext _dbContext) : IDbInitializer
	{
		public virtual async Task InitializeAsync()
		{
			var pendingMigrations = await _dbContext.Database.GetPendingMigrationsAsync();

			if (pendingMigrations.Any())
				await _dbContext.Database.MigrateAsync(); // Update-Database
		}


		public abstract Task SeedAsync();
	}
}
