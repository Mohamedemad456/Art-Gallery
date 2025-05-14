using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using FCIH.ArtGallery.Core.Application.Exceptions;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs;
using FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FCIH.ArtGallery.Core.Application.Services.Artwork_Service
{
	internal class ArtworkService(IUnitOfWork unitOfWork, IMapper mapper) : IArtworkService
	{
		public async Task<Pagination<ArtworkListDto>> GetApprovedArtworksWithFilterAsync(ArtworkFilterDto filter)
		{
			var spec = new ApprovedArtworksWithFiltersSpec(filter.PageSize, filter.PageIndex, filter.Title, filter.CategoryId, filter.TagIds, filter.ArtistId);
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artworks = await repo.GetAllWithSpecAsync(spec);
			var totalCount = await repo.GetCountAsync(spec);
			var data = mapper.Map<IEnumerable<ArtworkListDto>>(artworks);
			return new Pagination<ArtworkListDto>(filter.PageIndex, filter.PageSize, totalCount ) { Data = data };
		}

		public async Task<ArtworkDetailsDto> GetArtworkDetailsWithBidHistoryAsync(Guid artworkId)
		{
			var spec = new ArtworkByIdWithBidHistoryIncludesSpec(artworkId);
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetWithSpecAsync(spec) ?? throw new NotFoundException(nameof(Artwork), artworkId);
						

			return mapper.Map<ArtworkDetailsDto>(artwork);
		}

		public async Task<IEnumerable<BidDto>> GetArtworkBidHistoryAsync(Guid artworkId)
		{
			var spec = new BidsByArtworkIdSpec(artworkId);
			var bidRepo = unitOfWork.GetRepository<Bid, Guid>();
			var bids = await bidRepo.GetAllWithSpecAsync(spec);
			return mapper.Map<IEnumerable<BidDto>>(bids);
		}

	}
}
