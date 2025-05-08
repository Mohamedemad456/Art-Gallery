using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using FCIH.ArtGallery.Core.Domain._Common;
using System.Linq.Expressions;
using FCIH.ArtGallery.Core.Domain.Contracts;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data
{
	[DbContextType(typeof(AppDbContext))]
	public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
	{

		

		public DbSet<UserProfile> UserProfiles { get; set; }
		
		public DbSet<Auction> Auctions { get; set; }
		public DbSet<Bid> Bids {  get; set; }
		public DbSet<ArtworkTag> ArtworkTags { get; set; }
		public DbSet<Tag> Tags { get; set; }
		public DbSet<Artwork> Artworks { get; set; }
		public DbSet<Category> Categories { get; set; }

		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}
		
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			//modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(AssemblyInformation).Assembly,
				type => type.GetCustomAttribute<DbContextTypeAttribute>()?.DbContextType == typeof(AppDbContext));
			
			ApplyGlobalQueryFilters(modelBuilder);
		}

		private void ApplyGlobalQueryFilters(ModelBuilder modelBuilder)
		{

			// Configure Soft Delete Global Query Filter
			var excludedTypes = new[]
				{
					typeof(Admin),
					typeof(Artist),
					typeof(Buyer)
				};

			foreach (var entityType in modelBuilder.Model.GetEntityTypes())
			{
				var clrType = entityType.ClrType;

				// Only apply if type implements ISoftDelete and is not one of the excluded
				if (typeof(ISoftDelete).IsAssignableFrom(clrType) && !excludedTypes.Contains(clrType))
				{
					var parameter = Expression.Parameter(clrType, "e");

					// e => EF.Property<bool>(e, "IsDeleted") == false
					var isDeletedProperty = Expression.Call(
						typeof(EF).GetMethod(nameof(EF.Property))!.MakeGenericMethod(typeof(bool)),
						parameter,
						Expression.Constant(nameof(ISoftDelete.IsDeleted)));

					var compareExpression = Expression.Equal(isDeletedProperty, Expression.Constant(false));
					var lambda = Expression.Lambda(compareExpression, parameter);

					modelBuilder.Entity(clrType).HasQueryFilter(lambda);
				}
			}


		}

	}
}
