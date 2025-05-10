using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Services.Admin;
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

		private readonly IConfiguration _configuration;

		public ServiceManager(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration, Func<IAuthService> authServiceFactory)
		{

			_configuration = configuration;

			_adminService = new Lazy<IAdminService>(() => new AdminService(unitOfWork, mapper));

			_authService = new Lazy<IAuthService>(authServiceFactory, LazyThreadSafetyMode.ExecutionAndPublication);
		}


		public IAuthService AuthService => _authService.Value;


		public IAdminService AdminService => _adminService.Value;

	}
}
