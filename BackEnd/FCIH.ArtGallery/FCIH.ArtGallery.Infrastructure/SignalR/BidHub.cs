using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer;
using FCIH.ArtGallery.Core.Application.Abstraction.SignalR;
using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.SignalR
{
	public class BidHub : Hub
	{
		public override Task OnConnectedAsync()
		{
			return base.OnConnectedAsync();
		}

		public async Task JoinArtworkGroup(Guid artworkId)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, artworkId.ToString());
		}

		public async Task LeaveAuctionGroup(Guid artworkId)
		{
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, artworkId.ToString());
		}
	}
}
