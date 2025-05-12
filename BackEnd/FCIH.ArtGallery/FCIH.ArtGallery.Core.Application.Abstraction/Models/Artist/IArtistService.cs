using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist
{
	public interface IArtistService
	{

		Task<Guid> CreateArtworkAsync(Guid artistId, ArtistCreateArtworkDto dto);
		Task UpdateArtworkAsync(Guid artistId, Guid artworkId, ArtistUpdateArtworkDto dto);
		Task DeleteArtworkAsync(Guid artistId, Guid artworkId);
		Task ExtendAuctionAsync(Guid artistId, Guid artworkId, TimeSpan additionalTime);
		Task<ArtistArtworkDetailsDto?> GetArtworkByIdAsync(Guid artistId, Guid artworkId);
		Task<Pagination<ArtistArtworkListDto>> GetMyArtworksAsync(Guid artistId, ArtistArtworkFilterDto filter);
		Task<ArtistProfileDto?> GetProfileAsync(Guid artistId);

		Task<WinnerBidDto?> GetWinnerBidForArtworkAsync(Guid artistId, Guid artworkId);
	}
}
