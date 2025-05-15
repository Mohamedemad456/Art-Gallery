using FCIH.ArtGallery.Core.Domain._Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FCIH.ArtGallery.Infrastructure.Persistence._Common;
using System.Reflection;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Configs._Base
{
	[DbContextType(typeof(AppDbContext))]
	public class BaseEntityConfiguration<TEntity, TKey> : IEntityTypeConfiguration<TEntity>
	where TEntity : BaseEntity<TKey>
	where TKey : IEquatable<TKey>
	{
		public virtual void Configure(EntityTypeBuilder<TEntity> builder)
		{

			builder.HasKey(e => e.Id);

			builder.Property(E => E.Id)
				.ValueGeneratedOnAdd();
		}
	}
}
