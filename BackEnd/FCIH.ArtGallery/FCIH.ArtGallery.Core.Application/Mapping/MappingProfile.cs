using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Bids.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Category.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag;
using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	public class MappingProfile : Profile
	{
		public MappingProfile() 
		{
			CreateMap<Artist, PendingArtistDto>()
			.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
			.ForMember(d => d.ProfilePictureUrl, O => O.MapFrom<PendingArtistPictureUrlResolver>());

			CreateMap<Artwork, PendingArtworkDto>()
			.ForMember(dest => dest.ArtistName, opt => opt.MapFrom(src => src.Artist.User.DisplayName))
				.ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
			.ForMember(dest => dest.ImageUrl, O => O.MapFrom<PendingArtworkPictureUrlResolver>());



			// Artwork Mappings
			CreateMap<Artwork, ArtistArtworkListDto>()
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.StartingPrice, opt => opt.MapFrom(src => src.Price))
				.ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom<CurrentPriceResolver>())

				.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ArtworkTags.Select(at => at.Tag)))
				.ForMember(dest => dest.ImageUrl, O => O.MapFrom<ArtworkListPictureUrlResolver>());

			CreateMap<Category, CategoryDto>();
			CreateMap<Tag, TagDto>();


			CreateMap<Artwork, ArtistArtworkDetailsDto>()
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.StartingPrice, opt => opt.MapFrom(src => src.Price))
				.ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom<ArtistArtworkDetailsCurrentPriceResolver>())
				.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ArtworkTags.Select(at => at.Tag)))
				.ForMember(dest => dest.ImageUrl, O => O.MapFrom<ArtistArtworkDetailsPictureUrlResolver>())
				.ForMember(dest => dest.AuctionStart, opt => opt.MapFrom(src => src.Auction!.StartTime))
				.ForMember(dest => dest.AuctionEnd, opt => opt.MapFrom(src => src.Auction!.EndTime))
				.ForMember(dest => dest.Bids, opt => opt.MapFrom(src => src.Auction!.Bids));


			CreateMap<Tag, TagDto>();

			// Bid → BidResponseDto
			CreateMap<Bid, BidResponseDto>()
				
				.ForMember(dest => dest.ArtworkId, opt => opt.MapFrom(src => src.Auction.ArtworkId))
				.ForMember(dest => dest.BuyerName, opt => opt.MapFrom(src => src.Buyer.Name))
				.ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
				.ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

			CreateMap<Bid, BidDto>()
				.ForMember(dest => dest.BuyerName, opt => opt.MapFrom(src => src.Buyer.Name))
				 .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
				.ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

			CreateMap<Bid, WinnerBidDto>()
				.ForMember(dest => dest.BuyerId, opt => opt.MapFrom(src => src.BuyerId))
				.ForMember(dest => dest.BuyerFullName, opt => opt.MapFrom(src => src.Buyer.Name))
				.ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
				.ForMember(dest => dest.BidTime, opt => opt.MapFrom(src => src.CreatedAt));

			// Artist Profile Mapping
			CreateMap<Artist, ArtistProfileDto>()
				.ForMember(d => d.FullName , o => o.MapFrom(s => s.Name))
				.ForMember(dest => dest.ProfileImageUrl, O => O.MapFrom<ArtistProfilePictureUrlResolver>());


			// CreateArtworkDto to Artwork
			CreateMap<ArtistCreateArtworkDto, Artwork>()
				.ForMember(dest => dest.ImageUrl, opt => opt.Ignore())
				.ForMember(dest => dest.Auction, opt => opt.Ignore())
				.ForMember(dest => dest.ArtworkTags, opt => opt.Ignore());

			// UpdateArtworkDto to Artwork
			CreateMap<ArtistUpdateArtworkDto, Artwork>()
				.ForMember(dest => dest.ImageUrl, opt => opt.Ignore())
				.ForMember(dest => dest.Auction, opt => opt.Ignore())
				.ForMember(dest => dest.ArtworkTags, opt => opt.Ignore());
				//.ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));



			// Artowrk To Return For buyer

			CreateMap<Artwork, ArtworkListDto>()
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.ArtistName, opt => opt.MapFrom(src => src.Artist.Name))
				.ForMember(dest => dest.StartingPrice, opt => opt.MapFrom(src => src.Price))
				.ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom<ArtworkCurrentPriceResolver>())
				.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ArtworkTags.Select(at => at.Tag)))
				.ForMember(dest => dest.ImageUrl, O => O.MapFrom<PublicArtworkListPictureUrlResolver>());



			CreateMap<Artwork, ArtworkDetailsDto>()
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.ArtistName, opt => opt.MapFrom(src => src.Artist.Name))
				.ForMember(dest => dest.StartingPrice, opt => opt.MapFrom(src => src.Price))
				.ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom<ArtworkDetailsCurrentPriceResolver>())
				.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ArtworkTags.Select(at => at.Tag)))
				.ForMember(dest => dest.ImageUrl, O => O.MapFrom<PublicArtworkDetailsPictureUrlResolver>())
				.ForMember(dest => dest.AuctionStart, opt => opt.MapFrom(src => src.Auction!.StartTime))
				.ForMember(dest => dest.AuctionEnd, opt => opt.MapFrom(src => src.Auction!.EndTime))
				.ForMember(dest => dest.BidsHistory, opt => opt.MapFrom(src => src.Auction!.Bids));

		}
	}
}
