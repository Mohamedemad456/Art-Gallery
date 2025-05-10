using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Core.Application.Abstraction.Models.Common
{
	public class PaginationSpecParams
	{

		private const int MaxPageSize = 10;
		private int pageSize = 5;

		public int PageIndex { get; set; } = 1;

		public int PageSize
		{
			get { return pageSize; }
			set { pageSize = value > MaxPageSize ? MaxPageSize : value; }
		}
	}
}
