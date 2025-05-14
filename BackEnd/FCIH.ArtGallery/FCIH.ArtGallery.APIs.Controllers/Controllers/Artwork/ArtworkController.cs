using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Artwork
{
	public class ArtworkController (IServiceManager serviceManager): ApiControllerBase
	{
		[AllowAnonymous]
		[HttpGet("artworks")]
		public async Task<ActionResult<Pagination<ArtworkListDto>>> GetApprovedArtworks([FromQuery] ArtworkFilterDto filter)
		{
			var artworks = await serviceManager.ArtworkService.GetApprovedArtworksWithFilterAsync(filter);
			return Ok(artworks);
		}

		[AllowAnonymous]
		[HttpGet("artworks/{artworkId}")]
		public async Task<ActionResult<ArtworkDetailsDto>> GetArtworkDetails(Guid artworkId)
		{
			var artwork = await serviceManager.ArtworkService.GetArtworkDetailsWithBidHistoryAsync(artworkId);
			return Ok(artwork);
		}

		[AllowAnonymous]
		[HttpGet("artworks/{artworkId}/bids")]
		public async Task<ActionResult<IEnumerable<BidDto>>> GetBidHistory(Guid artworkId)
		{
			var bids = await serviceManager.ArtworkService.GetArtworkBidHistoryAsync(artworkId);
			return Ok(bids);
		}
	}
}
