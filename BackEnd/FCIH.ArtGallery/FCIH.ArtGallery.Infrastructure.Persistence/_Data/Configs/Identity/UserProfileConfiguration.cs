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

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Identity
{
	[DbContextType(typeof(AppDbContext))]
public class UserProfileConfiguration : BaseEntityConfiguration<UserProfile, Guid>
	{
		public override void Configure(EntityTypeBuilder<UserProfile> builder)
		{
			base.Configure(builder);

			builder.Property(p => p.Name).HasMaxLength(100).IsRequired();

			builder.HasOne(p => p.User)
				   .WithOne(u => u.UserProfile)
				   .HasForeignKey<UserProfile>(p => p.UserId)
				   .OnDelete(DeleteBehavior.Cascade);

			builder.HasDiscriminator<string>("ProfileType")
				   .HasValue<Admin>("Admin")
				   .HasValue<Artist>("Artist")
				   .HasValue<Buyer>("Buyer");


		}
	}
}
