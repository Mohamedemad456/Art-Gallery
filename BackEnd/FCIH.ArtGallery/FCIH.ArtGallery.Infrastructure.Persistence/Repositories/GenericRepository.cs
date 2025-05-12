
using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Contracts;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Contracts.ISpecifications;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence.Repositories
{
	internal class GenericRepository<TEntity, TKey>(AppDbContext DbContext) : IGenericRepository<TEntity, TKey>
		where TEntity : BaseEntity<TKey>
		where TKey : IEquatable<TKey>
	{
		public async Task<IEnumerable<TEntity>> GetAllAsync(bool withTracking = false)
		{
			

			return withTracking ? await DbContext.Set<TEntity>().ToListAsync() :
									  await DbContext.Set<TEntity>().AsNoTracking().ToListAsync();

		}

		public async Task<IEnumerable<TEntity>> GetAllWithSpecAsync(ISpecification<TEntity, TKey> spec, bool withTracking = false)
		{
			var query = ApplySpecifications(spec);
			if (!withTracking)
				query = query.AsNoTracking();

			return await query.ToListAsync();


		}

		


		public async Task<TEntity?> GetAsync(TKey id)
		{

			return await DbContext.Set<TEntity>().FirstOrDefaultAsync(E => E.Id.Equals(id));
		}

		public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> predicate)
		{
			return await DbContext.Set<TEntity>().FirstOrDefaultAsync(predicate);
		}
		public async Task<TEntity?> GetWithSpecAsync(ISpecification<TEntity, TKey> spec)
		{
			return await ApplySpecifications(spec).FirstOrDefaultAsync();

		}


		public async Task<int> GetCountAsync(ISpecification<TEntity, TKey> spec)
		{
			return await ApplySpecifications(spec).CountAsync();
		}

		public async Task AddAsync(TEntity entity) => await DbContext.Set<TEntity>().AddAsync(entity);

		public void Delete(TEntity entity)
		{
			if (entity is ISoftDelete softDeleteEntity)
			{
				softDeleteEntity.IsDeleted = true;
				DbContext.Set<TEntity>().Update(entity);
			}
			else
			{
				DbContext.Set<TEntity>().Remove(entity);
			}
		}
		public void Update(TEntity entity) => DbContext.Set<TEntity>().Update(entity);


		#region Helpers
		private IQueryable<TEntity> ApplySpecifications(ISpecification<TEntity, TKey> spec)
		{
			return SpecificationsEvaluator<TEntity, TKey>.GetQuery(DbContext.Set<TEntity>(), spec);
		}

		


		#endregion
	}
}
