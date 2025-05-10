using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
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
			.ForMember(dest => dest.ImageUrl, O => O.MapFrom<PendingArtworkPictureUrlResolver>());

		}
	}
}
