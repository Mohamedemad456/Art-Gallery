using FCIH.ArtGallery.Core.Application.Abstraction.Common;
using FCIH.ArtGallery.Core.Domain._Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Interceptors
{
	public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
	{
		private readonly ICurrentUserService _currentUserService;

		public AuditableEntitySaveChangesInterceptor(ICurrentUserService currentUserService)
		{
			_currentUserService = currentUserService;
		}

		public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
		{
			UpdateAuditableEntities(eventData.Context!);
			return base.SavingChanges(eventData, result);
		}

		public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
			DbContextEventData eventData,
			InterceptionResult<int> result,
			CancellationToken cancellationToken = default)
		{
			UpdateAuditableEntities(eventData.Context!);
			return base.SavingChangesAsync(eventData, result, cancellationToken);
		}

		private void UpdateAuditableEntities(DbContext context)
		{
			var entries = context.ChangeTracker.Entries<IBaseAuditableEntity>().Where(entity => entity.State is EntityState.Added or EntityState.Modified);

			var userId = _currentUserService.UserId ?? "System";

			foreach (var entry in entries)
			{
				if (entry.State == EntityState.Added)
				{
					entry.Entity.CreatedAt = DateTime.UtcNow;
					entry.Entity.CreatedBy = userId;
					entry.Entity.LastModifiedAt = DateTime.UtcNow;
					entry.Entity.LastModifiedBy = userId;
				}
				else if (entry.State == EntityState.Modified)
				{
					entry.Entity.LastModifiedAt = DateTime.UtcNow;
					entry.Entity.LastModifiedBy = userId;
				}
			}
		}
	}
}
