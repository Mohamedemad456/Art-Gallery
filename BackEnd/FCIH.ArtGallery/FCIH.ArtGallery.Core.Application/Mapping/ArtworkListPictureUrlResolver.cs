using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	internal class ArtworkListPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artwork, ArtistArtworkListDto, string>
	{
		public string Resolve(Artwork source, ArtistArtworkListDto destination, string destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ImageUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ImageUrl}";

			return string.Empty;
		}
	}

	internal class PublicArtworkListPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artwork, ArtworkListDto, string>
	{
		public string Resolve(Artwork source, ArtworkListDto destination, string destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ImageUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ImageUrl}";

			return string.Empty;
		}
	}
}
