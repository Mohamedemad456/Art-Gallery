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
	internal class PendingArtistPictureUrlResolver(IConfiguration configuration) : IValueResolver<Artist, PendingArtistDto, string?>
	{


		public string? Resolve(Artist source, PendingArtistDto destination, string? destMember, ResolutionContext context)
		{
			if (!string.IsNullOrEmpty(source.ProfilePictureUrl))
				return $"{configuration["Urls:ApiBaseUrl"]}/{source.ProfilePictureUrl}";

			return string.Empty;
		}
	}
}
