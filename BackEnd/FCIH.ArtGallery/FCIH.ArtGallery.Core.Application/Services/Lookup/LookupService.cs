using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Category.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Lookup;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services.Lookup
{
	public class LookupService(IUnitOfWork unitOfWork, IMapper mapper) : ILookupService
	{
		public async Task<List<CategoryDto>> GetAllCategoriesAsync()
		{
			var repo = unitOfWork.GetRepository<Category, Guid>();
			var categories = await repo.GetAllAsync();
			return mapper.Map<List<CategoryDto>>(categories);
		}

		public async Task<List<TagDto>> GetAllTagsAsync()
		{
			var repo = unitOfWork.GetRepository<Tag, Guid>();
			var tags = await repo.GetAllAsync();
			return mapper.Map<List<TagDto>>(tags);
		}
	}

}
