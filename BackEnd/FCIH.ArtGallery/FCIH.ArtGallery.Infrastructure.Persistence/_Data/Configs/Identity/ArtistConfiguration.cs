using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using FCIH.ArtGallery.Core.Domain.Enums;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Identity
{
	[DbContextType(typeof(AppDbContext))]
public class ArtistConfiguration : IEntityTypeConfiguration<Artist>
	{
		public void Configure(EntityTypeBuilder<Artist> builder)
		{
			

			builder.Property(a => a.Bio).HasMaxLength(500);
			builder.Property(a => a.ProfilePictureUrl).HasMaxLength(300);

			builder.Property(a => a.ApprovalStatus)
				.HasConversion<string>();

			builder.HasMany(a => a.Artworks)
				   .WithOne(aw => aw.Artist)
				   .HasForeignKey(aw => aw.ArtistId)
				   .OnDelete(DeleteBehavior.Cascade);
		}
	}
}
