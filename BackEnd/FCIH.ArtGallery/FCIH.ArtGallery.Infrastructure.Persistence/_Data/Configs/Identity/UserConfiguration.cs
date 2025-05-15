using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Identity
{
	[DbContextType(typeof(AppDbContext))]
public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{

			builder.Property(U => U.DisplayName)
				.HasColumnType("varchar")
				.HasMaxLength(100)
				.IsRequired(true);

			builder.HasIndex(u => u.Email).IsUnique();

			
		}
	}
}
