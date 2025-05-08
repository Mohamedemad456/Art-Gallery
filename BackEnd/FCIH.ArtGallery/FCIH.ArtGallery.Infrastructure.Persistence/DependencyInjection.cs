using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;
using FCIH.ArtGallery.Core.Application.Abstraction.Logging;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using FCIH.ArtGallery.Infrastructure.Persistence._Data.Interceptors;
using FCIH.ArtGallery.Infrastructure.Persistence._Initializers;
using FCIH.ArtGallery.Infrastructure.Persistence.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FCIH.ArtGallery.Infrastructure.Persistence
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
		{

			#region Store DbContext

			services.AddDbContext<AppDbContext>((serviceProv, optionsBuilder) =>
			{

				var auditableInterceptor = serviceProv.GetRequiredService<AuditableEntitySaveChangesInterceptor>();
				var softDeleteInterceptor = serviceProv.GetRequiredService<SoftDeleteInterceptor>();

				optionsBuilder
				.UseLazyLoadingProxies()
				.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
				.AddInterceptors(auditableInterceptor, softDeleteInterceptor);
			});

			services.AddScoped(typeof(AuditableEntitySaveChangesInterceptor));
			services.AddScoped(typeof(SoftDeleteInterceptor));
			services.AddScoped(typeof(IStoreIdentityDbInitializer), typeof(StoreIdentityDbInitializer));
			services.AddScoped(typeof(IStoreDbInitializer), typeof(StoreDbInitializer));


			

			services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork.UnitOfWork));

			//services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

			services.AddScoped<ILoggerManager, LoggerManager>();

			#endregion



			return services;
		}
	}
}
