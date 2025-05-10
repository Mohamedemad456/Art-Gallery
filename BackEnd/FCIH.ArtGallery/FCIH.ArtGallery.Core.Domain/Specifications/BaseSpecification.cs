using FCIH.ArtGallery.Core.Domain._Common;
using FCIH.ArtGallery.Core.Domain.Contracts.ISpecifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications
{
	public class BaseSpecifications<TEntity, TKey> : ISpecification<TEntity, TKey>
		where TEntity : BaseEntity<TKey>
		where TKey : IEquatable<TKey>
	{
		public Expression<Func<TEntity, bool>>? Criteria { get; set; } = null;
		public List<Expression<Func<TEntity, object>>> Includes { get; set; } = new();
		public Expression<Func<TEntity, object>>? OrderBy { get; set; } = null;
		public Expression<Func<TEntity, object>>? OrderByDesc { get; set; } = null;
		public int Skip { get; set; }
		public int Take { get; set; }
		public bool IsPaginationEnabled { get; set; }

		protected BaseSpecifications(Expression<Func<TEntity, bool>> criteriaExpression)
		{
			Criteria = criteriaExpression;
		}

		protected BaseSpecifications(TKey id)
		{
			Criteria = E => E.Id.Equals(id);
		}

		private protected virtual void AddIncludes()
		{

		}
		private protected virtual void AddOrderBy(Expression<Func<TEntity, object>> orederByExpression)
		{
			OrderBy = orederByExpression;
		}
		private protected virtual void AddOrderByDesc(Expression<Func<TEntity, object>> orederByExpressionDesc)
		{
			OrderByDesc = orederByExpressionDesc;
		}

		private protected void ApplyPagination(int skip, int take)
		{
			IsPaginationEnabled = true;
			Skip = skip;
			Take = take;
		}
	}
}
