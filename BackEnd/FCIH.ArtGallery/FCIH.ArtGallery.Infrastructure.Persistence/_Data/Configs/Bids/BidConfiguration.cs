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

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Bids
{
public class BidConfiguration : BaseAuditableEntityConfiguration<Bid, Guid>
	{
		public override void Configure(EntityTypeBuilder<Bid> builder)
		{
			base.Configure(builder);

			builder.Property(b => b.Amount).HasColumnType("decimal(18,2)").IsRequired();
			builder.Property(b => b.TimePlaced).IsRequired();

			builder.HasOne(b => b.Auction)
				   .WithMany(a => a.Bids)
				   .HasForeignKey(b => b.AuctionId)
				   .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(b => b.Buyer)
				   .WithMany(bu => bu.Bids)
				   .HasForeignKey(b => b.BuyerId)
				   .OnDelete(DeleteBehavior.Restrict);

			builder.HasQueryFilter(b => !b.IsDeleted);

		}
	}
}
