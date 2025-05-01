using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using FCIH.ArtGallery.Infrastructure.Persistence._Data.Interceptors;
using FCIH.ArtGallery.Infrastructure.Persistence._Initializers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using FCIH.ArtGallery.Infrastructure.Persistence.Repositories;
using FCIH.ArtGallery.Core.Application.Abstraction.Logging;
using FCIH.ArtGallery.Infrastructure.Persistence.Logging;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;

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
