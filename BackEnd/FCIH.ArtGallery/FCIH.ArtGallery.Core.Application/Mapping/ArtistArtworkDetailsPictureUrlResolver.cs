using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs;
using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	internal class ArtistArtworkDetailsPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artwork, ArtistArtworkDetailsDto, string>
	{
		public string Resolve(Artwork source, ArtistArtworkDetailsDto destination, string destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ImageUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ImageUrl}";

			return string.Empty ;
		}

	}
}
