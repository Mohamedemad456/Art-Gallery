using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs._Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Artworks
{
public class ArtworkConfiguration : BaseAuditableEntityConfiguration<Artwork, Guid>
	{
		public override void Configure(EntityTypeBuilder<Artwork> builder)
		{
			base.Configure(builder);

			builder.Property(a => a.Title).HasMaxLength(200).IsRequired();
			builder.Property(a => a.Description).HasMaxLength(1000);
			builder.Property(a => a.Price).HasColumnType("decimal(18,2)").IsRequired();
			builder.Property(a => a.ImageUrl).HasMaxLength(300).IsRequired();

			builder.Property(a => a.ApprovalStatus)
				.HasConversion<string>()
				.HasDefaultValue(ApprovalStatus.Pending)
				.IsRequired();

			builder.HasQueryFilter(a => !a.IsDeleted);

			builder.HasOne(a => a.Artist)
			   .WithMany(ar => ar.Artworks)
			   .HasForeignKey(a => a.ArtistId)
			   .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(a => a.Category)
				   .WithMany(c => c.Artworks)
				   .HasForeignKey(a => a.CategoryId)
				   .OnDelete(DeleteBehavior.Restrict);

			builder.HasOne(a => a.Auction)
				   .WithOne(au => au.Artwork)
				   .HasForeignKey<Auction>(au => au.ArtworkId)
				   .OnDelete(DeleteBehavior.Cascade);
		}
	}


}
