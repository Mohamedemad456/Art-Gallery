﻿using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Contracts.ISpecifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Contracts.IRepositories
{
	public interface IGenericRepository<TEntity, TKey>
	   where TEntity : BaseEntity<TKey>
	   where TKey : IEquatable<TKey>
	{
		Task<IEnumerable<TEntity>> GetAllAsync(bool withTracking = false);
		Task<IEnumerable<TEntity>> GetAllWithSpecAsync(ISpecification<TEntity, TKey> spec, bool withTracking = false);

		Task<TEntity?> GetAsync(TKey id);
		Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> predicate);
		Task<TEntity?> GetWithSpecAsync(ISpecification<TEntity, TKey> spec);

		Task<int> GetCountAsync(ISpecification<TEntity, TKey> spec);

		Task AddAsync(TEntity entity);

		void Update(TEntity entity);

		void Delete(TEntity entity);
	}
}
