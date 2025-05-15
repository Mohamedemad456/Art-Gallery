using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks
{
	public interface IArtworkService
	{
		Task<Pagination<ArtworkListDto>> GetApprovedArtworksWithFilterAsync(ArtworkFilterDto filter);
		Task<ArtworkDetailsDto> GetArtworkDetailsWithBidHistoryAsync(Guid artworkId);
		Task<IEnumerable<BidDto>> GetArtworkBidHistoryAsync(Guid artworkId);
	}
}
