using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain._Common
{
	public interface IAuditableEntity
	{
		string? CreatedBy { get; set; }
		DateTime CreatedAt { get; set; }
		string? LastModifiedBy { get; set; }
		DateTime LastModifiedAt { get; set; }
		//bool IsDeleted { get; set; }
	}
	public abstract class BaseAuditableEntity<TKey>: BaseEntity<TKey> where TKey : IEquatable<TKey>
	{
		public string? CreatedBy { get; set; }
		public DateTime CreatedAt { get; set; }
		public string? LastModifiedBy { get; set; }
		public DateTime LastModifiedAt { get; set; }
		//public bool IsDeleted { get; set; } = false;
	}
	
}
