using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using FCIH.ArtGallery.Core.Application.Exceptions;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using FCIH.ArtGallery.Core.Domain.Specifications.Artist_specs;
using FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services.Admin
{
	public class AdminService(IUnitOfWork unitOfWork, IMapper mapper) : IAdminService
	{
		#region Artist
		public async Task<IEnumerable<PendingArtistDto>> GetPendingArtistsAsync()
		{
			var spec = new PendingArtistsSpecification();
			var repo = unitOfWork.GetRepository<Artist, Guid>();
			var artists = await repo.GetAllWithSpecAsync(spec);
			return mapper.Map<IEnumerable<PendingArtistDto>>(artists);
		}
		public async Task AcceptArtistAsync(Guid artistId)
		{

			
			var repo = unitOfWork.GetRepository<Artist, Guid>();
			var artist = await repo.GetAsync(artistId) ?? throw new NotFoundException(nameof(Artist) , artistId);
			artist.ApprovalStatus = ApprovalStatus.Accepted;
			repo.Update(artist);
			await unitOfWork.CompleteAsync();
		}
		
		public async Task RejectArtistAsync(Guid artistId)
		{
			var repo = unitOfWork.GetRepository<Artist, Guid>();
			var artist = await repo.GetAsync(artistId) ?? throw new NotFoundException(nameof(Artist), artistId);
			artist.ApprovalStatus = ApprovalStatus.Rejected;
			repo.Update(artist);
			await unitOfWork.CompleteAsync();
		}

		#endregion


		#region Artwork
		public async Task<Pagination<PendingArtworkDto>> GetPendingArtworksAsync(PaginationSpecParams specParams)
		{
			var spec = new PendingArtworksSpecification(specParams.PageSize , specParams.PageIndex);
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artworks = await repo.GetAllWithSpecAsync(spec);

			var data = mapper.Map<IEnumerable<PendingArtworkDto>>(artworks);

			var totalCount = await repo.GetCountAsync(spec);

			return new Pagination<PendingArtworkDto>(specParams.PageIndex, specParams.PageSize, totalCount) { Data = data }; ;
		}
		public async Task AcceptArtworkAsync(Guid artworkId)
		{
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetAsync(artworkId) ?? throw new NotFoundException(nameof(Artwork) , artworkId);
			artwork.ApprovalStatus = ApprovalStatus.Accepted;
			repo.Update(artwork);
			await unitOfWork.CompleteAsync();
		}


		public async Task RejectArtworkAsync(Guid artworkId)
		{
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetAsync(artworkId) ?? throw new NotFoundException(nameof(Artwork), artworkId);
			artwork.ApprovalStatus = ApprovalStatus.Rejected;
			repo.Update(artwork);
			await unitOfWork.CompleteAsync();
		}
		#endregion
	}
}
