using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Lookup;
using FCIH.ArtGallery.Core.Application.Abstraction.SignalR;
using FCIH.ArtGallery.Core.Application.Services.Admin;
using FCIH.ArtGallery.Core.Application.Services.Artist_Service;
using FCIH.ArtGallery.Core.Application.Services.Artwork_Service;
using FCIH.ArtGallery.Core.Application.Services.Buyer_Service;
using FCIH.ArtGallery.Core.Application.Services.Lookup;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services
{
	public class ServiceManager : IServiceManager
	{
		private readonly Lazy<IAuthService> _authService;
		private readonly Lazy<IAdminService> _adminService;
		private readonly Lazy<IArtistService> _artistService;
		private readonly Lazy<IBuyerService> _buyerService;
		private readonly Lazy<IArtworkService> _artworkService;
		private readonly Lazy<ILookupService> _lookupService;

		private readonly IConfiguration _configuration;

		public ServiceManager(IUnitOfWork unitOfWork, IMapper mapper, INotificationBidService notification, IConfiguration configuration, Func<IAuthService> authServiceFactory)
		{

			_configuration = configuration;




			_authService = new Lazy<IAuthService>(authServiceFactory, LazyThreadSafetyMode.ExecutionAndPublication);
			_adminService = new Lazy<IAdminService>(() => new AdminService(unitOfWork, mapper));
			_artistService = new Lazy<IArtistService>(() => new ArtistService(unitOfWork, mapper));
			_buyerService = new Lazy<IBuyerService>(() => new BuyerService(unitOfWork, mapper, notification));
			_artworkService = new Lazy<IArtworkService>(() => new ArtworkService(unitOfWork, mapper));
			_lookupService = new Lazy<ILookupService>(() => new LookupService(unitOfWork, mapper));




		}


		public IAuthService AuthService => _authService.Value;


		public IAdminService AdminService => _adminService.Value;

		public IArtistService ArtistService => _artistService.Value;

		public IBuyerService BuyerService => _buyerService.Value;

		public IArtworkService ArtworkService => _artworkService.Value;

		public ILookupService LookupService => _lookupService.Value ;
	}
}
