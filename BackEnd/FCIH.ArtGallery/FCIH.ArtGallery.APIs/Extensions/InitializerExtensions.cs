using FCIH.ArtGallery.Core.Application.Abstraction.Initializers;

namespace FCIH.ArtGallery.APIs.Extensions
{
	public static class InitializerExtensions
	{
		public static async Task<WebApplication> InitializeDbAsync(this WebApplication app)
		{

			using var scope = app.Services.CreateAsyncScope();
			var services = scope.ServiceProvider;
			var artGalleryIdentityContextInitializer = services.GetRequiredService<IStoreIdentityDbInitializer>();
			var artgalleryContextInitializer = services.GetRequiredService<IStoreDbInitializer>();


			var loggerFactory = services.GetRequiredService<ILoggerFactory>();

			try
			{

				await artGalleryIdentityContextInitializer.InitializeDbAsync();
				await artGalleryIdentityContextInitializer.SeedAsync();

				await artgalleryContextInitializer.InitializeDbAsync();
				await artgalleryContextInitializer.SeedAsync();
			}
			catch (Exception ex)
			{
				var logger = loggerFactory.CreateLogger<Program>();
				logger.LogError(ex, "an error has been occured during applying the migrations or the Data Seeding.");
			}
			return app;
		}
	}
}
