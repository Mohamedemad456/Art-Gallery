using FCIH.ArtGallery.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Domain.Specifications.Common
{
	public class ProfileIdSpecification : BaseSpecifications<UserProfile, Guid>
	{
		public ProfileIdSpecification(Guid UserId)
		: base(a => a.UserId == UserId)
		{
			AddIncludes();
		}

		private protected override void AddIncludes()
		{
			base.AddIncludes();

			Includes.Add(a => a.User);

		} 
	}
}
