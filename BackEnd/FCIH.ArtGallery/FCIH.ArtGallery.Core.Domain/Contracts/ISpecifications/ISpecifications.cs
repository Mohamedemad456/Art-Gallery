﻿using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Contracts.ISpecifications
{
	public interface ISpecification<TEntity, TKey>
		where TEntity : BaseEntity<TKey>
		where TKey : IEquatable<TKey>
	{

		public Expression<Func<TEntity, bool>>? Criteria { get; set; }

		public List<Expression<Func<TEntity, object>>> Includes { get; set; }

		public List<string> StringIncludes { get; set; }

		public Expression<Func<TEntity, object>>? OrderBy { get; set; }
		public Expression<Func<TEntity, object>>? OrderByDesc { get; set; }

		public int Skip { get; set; }
		public int Take { get; set; }

		public bool IsPaginationEnabled { get; set; }
	}
}
