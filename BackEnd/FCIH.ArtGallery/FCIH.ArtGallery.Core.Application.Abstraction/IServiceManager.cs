using FCIH.ArtGallery.Core.Application.Abstraction.Models.Auth;
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
	}
}
