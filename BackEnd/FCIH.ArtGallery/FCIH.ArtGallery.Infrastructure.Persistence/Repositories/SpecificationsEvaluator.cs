
using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Contracts.ISpecifications;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence.Repositories
{
	internal static class SpecificationsEvaluator<TEntity, TKey>
	where TEntity : BaseEntity<TKey>
	where TKey : IEquatable<TKey>
	{
		public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity, TKey> spec)
		{
			var query = inputQuery; 

			if (spec.Criteria is not null) 
				query = query.Where(spec.Criteria);



			if (spec.OrderByDesc is not null)
				query = query.OrderByDescending(spec.OrderByDesc);
			else if (spec.OrderBy is not null) 
				query = query.OrderBy(spec.OrderBy);


			if (spec.IsPaginationEnabled)
				query = query.Skip(spec.Skip).Take(spec.Take);



			query = spec.Includes.Aggregate(query, (currentQuery, include) => currentQuery.Include(include));




			return query;
		}
	}
}
