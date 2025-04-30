using FCIH.ArtGallery.Core.Domain.Entities;
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
public class AuctionConfiguration : BaseAuditableEntityConfiguration<Auction, Guid>
	{
		public override void Configure(EntityTypeBuilder<Auction> builder)
		{
			base.Configure(builder);

			builder.Property(a => a.StartTime).IsRequired();
			builder.Property(a => a.EndTime).IsRequired();
			builder.Property(a => a.FinalPrice);

			builder.HasMany(a => a.Bids)
				   .WithOne(b => b.Auction)
				   .HasForeignKey(b => b.AuctionId)
				   .OnDelete(DeleteBehavior.Cascade);
		}
	}
}
