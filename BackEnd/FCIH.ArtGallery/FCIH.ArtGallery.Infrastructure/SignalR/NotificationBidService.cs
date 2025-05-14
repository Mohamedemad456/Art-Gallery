using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.SignalR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.SignalR
{
	public class NotificationBidService(IHubContext<BidHub> hubContext) : INotificationBidService
	{

		private readonly IHubContext<BidHub> _hubContext = hubContext;

		public async Task PlaceBidAsync(BidResponseDto bidDto)
		{
			await _hubContext
				.Clients
				.Group(bidDto.ArtworkId.ToString())
				.SendAsync("ReceiveBid", bidDto);
		}

	}
}
