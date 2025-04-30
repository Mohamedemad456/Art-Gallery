using FCIH.ArtGallery.Core.Domain._Common;
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

	public class TagConfigurations : BaseEntityConfiguration<Tag, Guid>
	{
		public override void Configure(EntityTypeBuilder<Tag> builder)
		{
			base.Configure(builder);

			builder.Property(t => t.Name).IsRequired().HasMaxLength(100);



		}
	}
}
