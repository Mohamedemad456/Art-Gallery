using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	public class CurrentPriceResolver : IValueResolver<Artwork, ArtistArtworkListDto, decimal>
	{
		public decimal Resolve(Artwork source, ArtistArtworkListDto destination, decimal destMember, ResolutionContext context)
		{
			var highestBid = source.Auction?.Bids?.OrderByDescending(b => b.Amount).FirstOrDefault();
			return highestBid?.Amount ?? source.Price;


		}
	}
	public class ArtistArtworkDetailsCurrentPriceResolver : IValueResolver<Artwork, ArtistArtworkDetailsDto, decimal>
	{
		public decimal Resolve(Artwork source, ArtistArtworkDetailsDto destination, decimal destMember, ResolutionContext context)
		{
			var highestBid = source.Auction?.Bids?.OrderByDescending(b => b.Amount).FirstOrDefault();
			return highestBid?.Amount ?? source.Price;


		}
	}
	public class ArtworkCurrentPriceResolver : IValueResolver<Artwork, ArtworkListDto, decimal>
	{
		public decimal Resolve(Artwork source, ArtworkListDto destination, decimal destMember, ResolutionContext context)
		{
			var highestBid = source.Auction?.Bids?.OrderByDescending(b => b.Amount).FirstOrDefault();
			return highestBid?.Amount ?? source.Price;


		}
	}
	public class ArtworkDetailsCurrentPriceResolver : IValueResolver<Artwork, ArtworkDetailsDto, decimal>
	{
		public decimal Resolve(Artwork source, ArtworkDetailsDto destination, decimal destMember, ResolutionContext context)
		{
			var highestBid = source.Auction?.Bids?.OrderByDescending(b => b.Amount).FirstOrDefault();
			return highestBid?.Amount ?? source.Price;


		}
	}
}

