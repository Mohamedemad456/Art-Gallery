using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Buyer
{
	public interface IBuyerService
	{
		Task<BuyerProfileDto> GetBuyerProfileAsync(Guid buyerId);
		Task<BidResponseDto> PlaceBidAsync(Guid buyerId, PlaceBidDto placeBid);
	}
}
