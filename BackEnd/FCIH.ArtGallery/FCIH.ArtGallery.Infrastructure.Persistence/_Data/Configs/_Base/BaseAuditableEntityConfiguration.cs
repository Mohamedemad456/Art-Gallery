using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs._Base
{
public class BaseAuditableEntityConfiguration<TEntity, TKey> : BaseEntityConfiguration<TEntity, TKey>
	where TEntity : BaseAuditableEntity<TKey>
	where TKey : IEquatable<TKey>
	{
		public override void Configure(EntityTypeBuilder<TEntity> builder)
		{
			base.Configure(builder);

			builder.Property(e => e.CreatedBy).HasMaxLength(100);
			builder.Property(e => e.CreatedAt).IsRequired();
			builder.Property(e => e.LastModifiedBy).HasMaxLength(100);
			builder.Property(e => e.LastModifiedAt).IsRequired();
		}
	}
}
