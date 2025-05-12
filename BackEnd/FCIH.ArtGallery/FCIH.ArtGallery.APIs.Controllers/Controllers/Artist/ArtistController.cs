using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using FCIH.ArtGallery.Core.Application.Services.Artist_Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Artist
{
	[Authorize(Roles = "Artist")]
	public class ArtistController(IServiceManager serviceManager) : ApiControllerBase
	{
		[HttpGet("profile")]
		public async Task<ActionResult<ArtistProfileDto>> GetProfile()
		{
			var artistId = GetUserId();
			var result = await serviceManager.ArtistService.GetProfileAsync(artistId);
			return Ok(result);
		}

		[HttpPost("artworks")]
		public async Task<ActionResult> CreateArtwork([FromForm] ArtistCreateArtworkDto dto)
		{
			var artistId = GetUserId();
			await serviceManager.ArtistService.CreateArtworkAsync(artistId, dto);
			return Ok();
		}

		[HttpPut("artworks/{id}")]
		public async Task<ActionResult> UpdateArtwork(Guid id, [FromForm] ArtistUpdateArtworkDto dto)
		{
			var artistId = GetUserId();
			await serviceManager.ArtistService.UpdateArtworkAsync(artistId, id, dto);
			return Ok();
		}

		[HttpDelete("artworks/{id}")]
		public async Task<ActionResult> DeleteArtwork(Guid id)
		{
			var artistId = GetUserId();
			await serviceManager.ArtistService.DeleteArtworkAsync(artistId, id);
			return Ok();
		}

		[HttpPost("artworks/{id}/extend-auction")]
		public async Task<ActionResult> ExtendAuction(Guid id, [FromQuery] TimeSpan duration)
		{
			var artistId = GetUserId();
			await serviceManager.ArtistService.ExtendAuctionAsync(artistId, id, duration);
			return Ok();
		}

		[HttpGet("artworks")]
		public async Task<ActionResult<Pagination<ArtistArtworkListDto>>> GetOwnArtworks([FromQuery] ArtistArtworkFilterDto filter)
		{
			var artistId = GetUserId();
			var artworks = await serviceManager.ArtistService.GetMyArtworksAsync(artistId, filter);
			return Ok(artworks);
		}

		[HttpGet("artworks/{id}")]
		public async Task<ActionResult<ArtistArtworkDetailsDto>> GetArtworkDetails(Guid id)
		{
			var artistId = GetUserId();
			var artwork = await serviceManager.ArtistService.GetArtworkByIdAsync(artistId, id);
			return Ok(artwork);
		}

		[HttpGet("artworks/winner/{artworkId}")]
		public async Task<ActionResult<WinnerBidDto>> GetAuctionWinner(Guid artworkId)
		{
			var artistId = GetUserId(); 
			var winner = await serviceManager.ArtistService.GetWinnerBidForArtworkAsync(artistId, artworkId);

			return winner == null ? NotFound("No bids placed.") : Ok(winner);
		}

		private Guid GetUserId()
		{
			return Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		}

	}
}
