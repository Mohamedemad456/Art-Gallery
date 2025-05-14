using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Buyer
{

	[Authorize(Roles = "Buyer")]
	public class BuyerController(IServiceManager serviceManager) : ApiControllerBase
	{
		[HttpGet("profile")]
		public async Task<ActionResult<BuyerProfileDto>> GetProfile()
		{
			var buyerId = GetUserId();
			var profile = await serviceManager.BuyerService.GetBuyerProfileAsync(buyerId);
			return Ok(profile);
		}

		[HttpPost("artworks/placeBid")]
		public async Task<ActionResult> PlaceBid([FromBody] PlaceBidDto bidDto)
		{
			var buyerId = GetUserId();
			await serviceManager.BuyerService.PlaceBidAsync(buyerId, bidDto);
			return Ok();
		}

		private Guid GetUserId()
		{
			return Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		}
	}
}
