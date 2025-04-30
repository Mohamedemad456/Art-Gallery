using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using FCIH.ArtGallery.Infrastructure.Persistence.Repositories;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence.UnitOfWork
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly AppDbContext _dbContext;
		private readonly ConcurrentDictionary<string, object> _repositories;
		public UnitOfWork(AppDbContext dbContext)
		{
			_dbContext = dbContext;
			_repositories = new();
		}

		public IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
			where TEntity : BaseEntity<TKey>
			where TKey : IEquatable<TKey>
		{
		

			return (IGenericRepository<TEntity, TKey>)_repositories.GetOrAdd(typeof(TEntity).FullName!, new GenericRepository<TEntity, TKey>(_dbContext));
		}
		public Task<int> CompleteAsync() => _dbContext.SaveChangesAsync();

		public ValueTask DisposeAsync() => _dbContext.DisposeAsync();
	}
}
