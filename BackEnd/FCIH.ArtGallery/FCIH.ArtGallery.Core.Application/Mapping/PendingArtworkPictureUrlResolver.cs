using AutoMapper;
using FCIH.ArtGallery.Core.Application.Abstraction.Models.Admin.DTOs;
using FCIH.ArtGallery.Core.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Mapping
{
	internal class PendingArtworkPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artwork, PendingArtworkDto, string>
	{
		
	

		public string Resolve(Artwork source, PendingArtworkDto destination, string? destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ImageUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ImageUrl}";

			return string.Empty;
		}
	}
}
