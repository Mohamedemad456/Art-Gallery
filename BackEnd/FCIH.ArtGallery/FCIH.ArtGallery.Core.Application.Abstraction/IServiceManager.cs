﻿using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Lookup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction
{
	public interface IServiceManager
	{
		public IAuthService AuthService { get; }

		public IAdminService AdminService { get; }

		public IArtistService ArtistService { get; }

		public IBuyerService BuyerService { get; }

		public IArtworkService ArtworkService { get; }

		public ILookupService LookupService { get; }

	}
}
