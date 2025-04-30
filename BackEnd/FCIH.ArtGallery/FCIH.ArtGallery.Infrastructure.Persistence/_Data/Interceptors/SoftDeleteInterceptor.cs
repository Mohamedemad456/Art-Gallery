using FCIH.ArtGallery.Core.Application.Abstraction.Common;
using FCIH.ArtGallery.Core.Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Data.Interceptors
{
	public class SoftDeleteInterceptor : SaveChangesInterceptor
	{
		private readonly ICurrentUserService _currentUserService;

		public SoftDeleteInterceptor(ICurrentUserService currentUserService)
		{
			_currentUserService = currentUserService;
		}

		public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
		{
			OnBeforeSavingChanges(eventData.Context);
			return base.SavingChanges(eventData, result);
		}

		public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
			DbContextEventData eventData,
			InterceptionResult<int> result,
			CancellationToken cancellationToken = default)
		{
			OnBeforeSavingChanges(eventData.Context);
			return base.SavingChangesAsync(eventData, result, cancellationToken);
		}

		private static void OnBeforeSavingChanges(DbContext? context)
		{
			if (context == null) return;

			foreach (var entry in context.ChangeTracker.Entries()
				.Where(e => e.State == EntityState.Deleted && e.Entity is ISoftDelete))
			{
				entry.State = EntityState.Modified;
				((ISoftDelete)entry.Entity).IsDeleted = true;
			}
		}
	}
}
