using FCIH.ArtGallery.APIs.Controllers.Controllers._Base;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Category.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag;
using FCIH.ArtGallery.Core.Application.Services.Lookup;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.APIs.Controllers.Controllers.Lookup
{
	public class LookupController(IServiceManager serviceManager) : ApiControllerBase
	{
		[HttpGet("categories")]
		[AllowAnonymous]
		public async Task<ActionResult<List<CategoryDto>>> GetCategories()
		{
			var result = await serviceManager.LookupService.GetAllCategoriesAsync();
			return Ok(result);
		}

		[HttpGet("tags")]
		[AllowAnonymous]
		public async Task<ActionResult<List<TagDto>>> GetTags()
		{
			var result = await serviceManager.LookupService.GetAllTagsAsync();
			return Ok(result);
		}
	}
}
