using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artworks.DTOs;
using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	internal class PublicArtworkDetailsPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artwork, ArtworkDetailsDto, string>
	{
		public string Resolve(Artwork source, ArtworkDetailsDto destination, string destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ImageUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ImageUrl}";

			return string.Empty;
		}
	}
}
