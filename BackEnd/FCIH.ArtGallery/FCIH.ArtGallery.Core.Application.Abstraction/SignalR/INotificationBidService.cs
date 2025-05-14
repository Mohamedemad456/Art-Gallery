using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.SignalR
{
	public interface INotificationBidService 
	{
		Task PlaceBidAsync(BidResponseDto bidDto);
	}
}
