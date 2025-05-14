using FCIH.ArtGallery.Core.Application.Abstraction.SignalR;
using FCIH.ArtGallery.Infrastructure.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
		{

			services.AddSignalR();
			services.AddScoped<INotificationBidService, NotificationBidService>();


			return services;
		}
	}
}
