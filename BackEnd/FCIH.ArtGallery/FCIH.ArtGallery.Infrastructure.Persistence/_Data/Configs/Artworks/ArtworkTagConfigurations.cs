using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Artworks
{
	[DbContextType(typeof(AppDbContext))]
	public class ArtworkTagConfigurations : IEntityTypeConfiguration<ArtworkTag>
	{
		public void Configure(EntityTypeBuilder<ArtworkTag> builder)
		{

			builder.HasKey(at => new { at.ArtworkId, at.TagId });

			builder.HasOne(at => at.Artwork)
				   .WithMany(a => a.ArtworkTags)
				   .HasForeignKey(at => at.ArtworkId)
				   .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(at => at.Tag)
				   .WithMany(t => t.ArtworkTags)
				   .HasForeignKey(at => at.TagId)
				   .OnDelete(DeleteBehavior.Cascade);

			builder.HasQueryFilter(at => !at.Artwork.IsDeleted);
			builder.HasQueryFilter(at => !at.Tag.IsDeleted);

		}
	}
}
