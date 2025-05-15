using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Tag
{
	public class TagDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = default!;
	}
}
