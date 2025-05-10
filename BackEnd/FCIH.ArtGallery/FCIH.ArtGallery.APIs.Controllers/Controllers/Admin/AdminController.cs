using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Admin
{
	[Authorize()]
	public class AdminController (IServiceManager serviceManager) :ApiControllerBase
	{

		[HttpGet("artist/pending-artists")]
		public async Task<ActionResult<IEnumerable<PendingArtistDto>>> GetPendingArtists()
		{
			var result = await serviceManager.AdminService.GetPendingArtistsAsync();
			return Ok(result);
		}

		[HttpPut("artist/accept-artist/{id:guid}")]
		public async Task<ActionResult> AcceptArtist(Guid id)
		{
			await serviceManager.AdminService.AcceptArtistAsync(id);
			return NoContent();
		}

		[HttpPut("artist/reject-artist/{id:guid}")]
		public async Task<ActionResult> RejectArtist(Guid id)
		{
			await serviceManager.AdminService.RejectArtistAsync(id);
			return NoContent();
		}

		[HttpGet("artwork/pending-artworks")]
		public async Task<ActionResult<Pagination<PendingArtworkDto>>> GetPendingArtworks([FromQuery] PaginationSpecParams specParams)
		{
			var result = await serviceManager.AdminService.GetPendingArtworksAsync(specParams);
			return Ok(result);
		}

		[HttpPut("artwork/accept-artwork/{id:guid}")]
		public async Task<ActionResult> AcceptArtwork(Guid id)
		{
			await serviceManager.AdminService.AcceptArtworkAsync(id);
			return NoContent();
		}

		[HttpPut("artwork/reject-artwork/{id:guid}")]
		public async Task<ActionResult> RejectArtwork(Guid id)
		{
			await serviceManager.AdminService.RejectArtworkAsync(id);
			return NoContent();
		}
	}
}
