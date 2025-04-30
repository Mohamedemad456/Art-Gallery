using FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs._Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using FCIH.ArtGallery.Core.Domain.Entities;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs.Artworks
{
public class CategoryConfiguration : BaseEntityConfiguration<Category, Guid>
	{
		public override void Configure(EntityTypeBuilder<Category> builder)
		{
			base.Configure(builder);

			builder.Property(c => c.Name)
				   .HasMaxLength(100)
				   .IsRequired();

			builder.HasMany(c => c.Artworks)
				   .WithOne(a => a.Category)
				   .HasForeignKey(a => a.CategoryId)
				   .OnDelete(DeleteBehavior.Restrict);
		}
	}
}
