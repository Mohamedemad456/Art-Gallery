﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Contracts
{
	public interface ISoftDelete
	{
		bool IsDeleted { get; set; }

	}
}
