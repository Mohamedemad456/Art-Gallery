﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Artist.DTOs
{
	public class AuctionCreateDto
	{
		public  DateTime AuctionStart { get; set; }
		public DateTime AuctionEnd { get; set; }
	}
}
