using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;
using FCIH.ArtGallery.Core.Domain.Entities;
using FCIH.ArtGallery.Infrastructure.Persistence._Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence._Initializers
{
	internal sealed class StoreDbInitializer(AppDbContext _dbContext) : DbInitializer(_dbContext), IStoreDbInitializer
	{
		public override async Task SeedAsync()
		{

			if (!_dbContext.Categories.Any())
			{
				var categoriesData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/categories.json");
				var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);

				if (categories?.Count > 0)
				{
					await _dbContext.Set<Category>().AddRangeAsync(categories);
					await _dbContext.SaveChangesAsync();
				}
			}

			if (!_dbContext.Tags.Any())
			{
				var TagsData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/tags.json");
				var Tags = JsonSerializer.Deserialize<List<Tag>>(TagsData);

				if (Tags?.Count > 0)
				{
					await _dbContext.Set<Tag>().AddRangeAsync(Tags);
					await _dbContext.SaveChangesAsync();
				}
			}
			if (!_dbContext.Artworks.Any())
			{
				var ArtworksData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/artworks.json");
				var Artworks = JsonSerializer.Deserialize<List<Artwork>>(ArtworksData);

				if (Artworks?.Count > 0)
				{
					await _dbContext.Set<Artwork>().AddRangeAsync(Artworks);
					await _dbContext.SaveChangesAsync();
				}
			}
			


			if (!_dbContext.ArtworkTags.Any())
			{
				var ArtworkTagsData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/artworktags.json");
				var ArtworkTags = JsonSerializer.Deserialize<List<ArtworkTag>>(ArtworkTagsData);
				if (ArtworkTags?.Count > 0)
				{
					await _dbContext.Set<ArtworkTag>().AddRangeAsync(ArtworkTags);
					await _dbContext.SaveChangesAsync();
				}
			}
			
			if (!_dbContext.Auctions.Any())
			{
				var auctionsData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/auctions.json");
				var auctions = JsonSerializer.Deserialize<List<Auction>>(auctionsData);

				if (auctions?.Count > 0)
				{
					await _dbContext.Set<Auction>().AddRangeAsync(auctions);
					await _dbContext.SaveChangesAsync();
				}
			}

			if (!_dbContext.Bids.Any())
			{
				var bidsData = await File.ReadAllTextAsync("../FCIH.ArtGallery.Infrastructure.Persistence/_Data/Seeds/bids.json");
				var bids = JsonSerializer.Deserialize<List<Bid>>(bidsData);

				if (bids?.Count > 0)
				{
					await _dbContext.Set<Bid>().AddRangeAsync(bids);
					await _dbContext.SaveChangesAsync();
				}
			}
		}
	}
}
