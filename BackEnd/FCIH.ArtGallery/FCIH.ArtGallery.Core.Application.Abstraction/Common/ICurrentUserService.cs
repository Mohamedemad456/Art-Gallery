﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Common
{
	public interface ICurrentUserService
	{
		string? UserId { get; }
	}

}
