using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin
{
	public interface IAdminService
	{
		Task<IEnumerable<PendingArtistDto>> GetPendingArtistsAsync();
		Task AcceptArtistAsync(Guid artistId);
		Task RejectArtistAsync(Guid artistId);

		Task<Pagination<PendingArtworkDto>> GetPendingArtworksAsync(PaginationSpecParams specParams);
		Task AcceptArtworkAsync(Guid artworkId);
		Task RejectArtworkAsync(Guid artworkId);


	}
}
