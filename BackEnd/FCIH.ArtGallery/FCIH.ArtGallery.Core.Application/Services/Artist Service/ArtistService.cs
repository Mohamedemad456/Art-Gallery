﻿using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Common;
using FCIH.ArtGallery.Core.Application.Exceptions;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Enums;
using FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs;
using FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs;
using FCIH.ArtGallery.Core.Domain.Specifications.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services.Artist_Service
{
	public class ArtistService(IUnitOfWork unitOfWork, IMapper mapper) : IArtistService
	{
		public async Task<Guid> CreateArtworkAsync(Guid userId, ArtistCreateArtworkDto dto)
		{
			var artworkRepo = unitOfWork.GetRepository<Artwork, Guid>();

			var artwork = mapper.Map<Artwork>(dto);
			artwork.ArtistId = await GetArtistId(userId);
			artwork.ApprovalStatus = ApprovalStatus.Pending;

			// Image Upload
			if (dto.Image is not null && dto.Image.Length > 0)
			{
				var uploadsFolder = Path.Combine("wwwroot", "images", "artworks");
				Directory.CreateDirectory(uploadsFolder);

				var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
				var filePath = Path.Combine(uploadsFolder, fileName);

				using var stream = new FileStream(filePath, FileMode.Create);
				await dto.Image.CopyToAsync(stream);

				artwork.ImageUrl = $"images/artworks/{fileName}";
			}

			// Save artwork first to generate its ID
			await artworkRepo.AddAsync(artwork);
			await unitOfWork.CompleteAsync();

			// Artwork Tags (even if empty, we continue)
			if (dto.Tags is not null && dto.Tags.Count > 0)
			{
				artwork.ArtworkTags = dto.Tags.Select(tagId => new ArtworkTag
				{
					TagId = tagId,
					ArtworkId = artwork.Id
				}).ToList();

				artworkRepo.Update(artwork);
				await unitOfWork.CompleteAsync();
			}

			// Auction
			if (dto.Auction is not null)
			{
				if (dto.Auction.AuctionEnd <= dto.Auction.AuctionStart)
					throw new BadRequestException("Auction end time must be after start time.");
				var auctionRepo = unitOfWork.GetRepository<Auction, Guid>();

				
				await auctionRepo.AddAsync(new Auction
				{
					Id = Guid.NewGuid(),
					ArtworkId = artwork.Id,
					StartTime = dto.Auction.AuctionStart,
					EndTime = dto.Auction.AuctionEnd,
					FinalPrice = dto.Price
				});

				await unitOfWork.CompleteAsync();
			}

			return artwork.Id;
		}

		public async Task UpdateArtworkAsync(Guid userId, Guid artworkId, ArtistUpdateArtworkDto dto)
		{
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetAsync(artworkId);

			if (artwork == null || artwork.ArtistId != await GetArtistId(userId))
				throw new UnAuthorizedException("Artwork not found or unauthorized");

			if (!string.IsNullOrWhiteSpace(dto.Title))
				artwork.Title = dto.Title;

			if (!string.IsNullOrWhiteSpace(dto.Description))
				artwork.Description = dto.Description;

			if (dto.Price.HasValue)
				artwork.Price = dto.Price.Value;

			if (dto.CategoryId.HasValue)
				artwork.CategoryId = dto.CategoryId.Value;

			if (dto.Image is not null && dto.Image.Length > 0)
			{
				if (!string.IsNullOrWhiteSpace(artwork.ImageUrl))
				{
					var oldPath = Path.Combine("wwwroot", artwork.ImageUrl);
					if (File.Exists(oldPath))
						File.Delete(oldPath);
				}

				var uploadsFolder = Path.Combine("wwwroot", "images", "artworks");
				Directory.CreateDirectory(uploadsFolder);
				var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
				var filePath = Path.Combine(uploadsFolder, fileName);

				using var stream = new FileStream(filePath, FileMode.Create);
				await dto.Image.CopyToAsync(stream);

				artwork.ImageUrl = Path.Combine("images", "artworks", fileName).Replace("\\", "/");
			}

			if (dto.Tags is not null)
			{
				artwork.ArtworkTags = dto.Tags.Select(tagId => new ArtworkTag
				{
					TagId = tagId,
					ArtworkId = artwork.Id
				}).ToList();
			}

			repo.Update(artwork);
			await unitOfWork.CompleteAsync();

			if (dto.Auction is not null)
			{
				var auctionRepo = unitOfWork.GetRepository<Auction, Guid>();
				var existingAuction = await auctionRepo
					.GetAsync(a => a.ArtworkId == artwork.Id);

				if (existingAuction is null)
				{
					await auctionRepo.AddAsync(new Auction
					{
						Id = Guid.NewGuid(),
						ArtworkId = artwork.Id,
						StartTime = dto.Auction.AuctionStart,
						EndTime = dto.Auction.AuctionEnd,
						FinalPrice = dto.Price
					});
				}
				else
				{
					existingAuction.StartTime = dto.Auction.AuctionStart;
					existingAuction.EndTime = dto.Auction.AuctionEnd;
					existingAuction.FinalPrice = dto.Price;
					auctionRepo.Update(existingAuction);
				}

				await unitOfWork.CompleteAsync();
			}
		}

		public async Task DeleteArtworkAsync(Guid userId, Guid artworkId)
		{
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetAsync(artworkId);

			if (artwork == null || artwork.ArtistId != await GetArtistId(userId))
				throw new UnAuthorizedException("Artwork not found or unauthorized");

			repo.Delete(artwork);
			await unitOfWork.CompleteAsync();
		}

		public async Task ExtendAuctionAsync(Guid userId, Guid artworkId, TimeSpan additionalTime)
		{
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetAsync(artworkId);

			if (artwork == null || artwork.ArtistId != await GetArtistId(userId))
				throw new UnAuthorizedException("Artwork not found or unauthorized");

			if (artwork.Auction!.EndTime <= DateTime.UtcNow)
				throw new InvalidOperationException("Can't extend finished auction");

			artwork.Auction.EndTime = artwork.Auction.EndTime.Add(additionalTime);
			repo.Update(artwork);
			await unitOfWork.CompleteAsync();
		}

		public async Task<ArtistArtworkDetailsDto?> GetArtworkByIdAsync(Guid userId, Guid artworkId)
		{
			var atistId = await GetArtistId(userId);

			var spec = new ArtworkByIdWithIncludesSpec(artworkId, atistId);
			var repo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await repo.GetWithSpecAsync(spec);

			return artwork == null ? null : mapper.Map<ArtistArtworkDetailsDto>(artwork);
		}

		public async Task<Pagination<ArtistArtworkListDto>> GetMyArtworksAsync(Guid userId, ArtistArtworkFilterDto filter)
		{

			var atistId = await GetArtistId(userId);

			var spec = new MyArtworksWithFiltersSpec(atistId, filter.PageSize, filter.PageIndex, filter.Title, filter.ApprovalStatus , filter.CategoryId, filter.Tags );
			var repo = unitOfWork.GetRepository<Artwork, Guid>();

			var artworks = await repo.GetAllWithSpecAsync(spec);

			var data = mapper.Map<IEnumerable<ArtistArtworkListDto>>(artworks);

			var totalCount = await repo.GetCountAsync(spec);

			return new Pagination<ArtistArtworkListDto>(filter.PageIndex, filter.PageSize, totalCount) { Data = data }; 
		}


		public async Task<ArtistProfileDto?> GetProfileAsync(Guid artistId)
		{
			//var spec = new ProfileIdSpecification(artistId);
			var repo = unitOfWork.GetRepository<Artist, Guid>();
			var profile = await repo.GetAsync(a => a.UserId == artistId);
			return profile == null ? throw new UnAuthorizedException("Not Found") : mapper.Map<ArtistProfileDto>(profile);
		}

		public async Task<WinnerBidDto?> GetWinnerBidForArtworkAsync(Guid userId, Guid artworkId)
		{

			var atistId = await GetArtistId(userId);
			var artworkRepo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await artworkRepo.GetAsync(artworkId);

			if (artwork == null || artwork.ArtistId != atistId)
				throw new NotFoundException(nameof(Artwork), artworkId);

			if (artwork.Auction == null || DateTime.UtcNow < artwork.Auction.EndTime)
				throw new BadRequestException("Auction is not ended yet.");

			var bidRepo = unitOfWork.GetRepository<Bid, Guid>();
			var spec = new HighestBidWithBuyerSpec(artworkId);
			var topBid = (await bidRepo.GetAllWithSpecAsync(spec)).FirstOrDefault();

			return topBid == null ? null : mapper.Map<WinnerBidDto>(topBid);
		}


		private async Task<Guid> GetArtistId(Guid UserId)
		{
			 var repo = unitOfWork.GetRepository<Artist, Guid>();
			var profile = await repo.GetAsync(a => a.UserId == UserId);

			return profile!.Id;
		}
	}
}
