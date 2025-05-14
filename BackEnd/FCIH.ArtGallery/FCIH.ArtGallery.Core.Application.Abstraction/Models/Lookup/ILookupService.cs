using FCIH.ArtGallery.Core.Application.Abstraction.Models.Category.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Lookup
{
	public interface ILookupService
	{
		Task<List<CategoryDto>> GetAllCategoriesAsync();
		Task<List<TagDto>> GetAllTagsAsync();
	}
}
