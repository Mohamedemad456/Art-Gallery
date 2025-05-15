using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.SignalR;
using FCIH.ArtGallery.Core.Application.Exceptions;
using FCIH.ArtGallery.Core.Domain.Contracts.IRepositories;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Core.Domain.Specifications.Artwork_specs;
using FCIH.ArtGallery.Core.Domain.Specifications.Bid_specs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Services.Buyer_Service
{
	internal class BuyerService(IUnitOfWork unitOfWork, IMapper mapper, INotificationBidService notification) : IBuyerService
	{
		public async Task<BuyerProfileDto> GetBuyerProfileAsync(Guid UserId)
		{
			var buyerId = await GetBuyerId(UserId);

			var repo = unitOfWork.GetRepository<Buyer, Guid>();
			var buyer = await repo.GetAsync(buyerId)
						?? throw new NotFoundException(nameof(Buyer), buyerId);

			return mapper.Map<BuyerProfileDto>(buyer);
		}

		public async Task<BidResponseDto> PlaceBidAsync(Guid UserId, PlaceBidDto placeBid)
		{

			var buyerId = await GetBuyerId(UserId);

			var spec = new ArtworkByIdWithBidHistoryIncludesSpec(placeBid.ArtworkId);

			var artworkRepo = unitOfWork.GetRepository<Artwork, Guid>();
			var artwork = await artworkRepo.GetWithSpecAsync(spec)
							?? throw new NotFoundException(nameof(Artwork), placeBid.ArtworkId);

			var now = DateTime.UtcNow;

			if (artwork.Auction == null)
				throw new InvalidOperationException("Bidding is not allowed. This artwork has no auction.");


			if (artwork.Auction.StartTime > now)
				throw new InvalidOperationException("The auction has not started yet.");

			if (artwork.Auction.EndTime < now)
				throw new InvalidOperationException("The auction has ended.");

			var lastBid = artwork.Auction.Bids!.OrderByDescending(b => b.Amount).FirstOrDefault();
			var minBid = lastBid != null ? lastBid.Amount + 10 : artwork.Price;

			if (placeBid.Amount < minBid)
				throw new InvalidOperationException($"Bid must be at least ${minBid}");

			var bid = new Bid

			{
				Id = Guid.NewGuid(),
				Amount = placeBid.Amount,
				TimePlaced = now,
				AuctionId = artwork.Auction.Id,
				BuyerId = buyerId

			};

			var bidWithNav = await unitOfWork.GetRepository<Bid, Guid>()
			.GetWithSpecAsync(new BidWithBuyerAndAuctionSpec(bid.Id));

			var response = mapper.Map<BidResponseDto>(bidWithNav);

			await notification.PlaceBidAsync(response);

			return response;
		}

		private async Task<Guid> GetBuyerId(Guid UserId)
		{
			var repo = unitOfWork.GetRepository<Buyer, Guid>();
			var profile = await repo.GetAsync(a => a.UserId == UserId);

			return profile!.Id;
		}
	}
}

