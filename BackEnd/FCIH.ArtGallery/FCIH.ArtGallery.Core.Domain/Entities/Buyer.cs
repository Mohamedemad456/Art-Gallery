using FCIH.ArtGallery.Core.Domain._Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Entities
{
	public class Buyer : UserProfile
	{
		

		public ICollection<Bid> Bids { get; set; } = new HashSet<Bid>();
	}
}
