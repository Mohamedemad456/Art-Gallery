using FCIH.ArtGallery.Core.Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain._Common
{

	
	public abstract class BaseEntity<TKey> : ISoftDelete where TKey : IEquatable<TKey>
	{
		public required TKey Id { get; set; }
		public bool IsDeleted { get; set; } = false;
	}
}
