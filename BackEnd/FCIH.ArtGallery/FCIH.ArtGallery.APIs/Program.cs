
using FCIH.ArtGallery.APIs.Extensions;
using FCIH.ArtGallery.Core.Application.Abstraction.Common;
using FCIH.ArtGallery.Infrastructure.Persistence;
using FCIH.ArtGallery.Infrastructure.Services;

namespace FCIH.ArtGallery.APIs
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var webApplicationBuilder = WebApplication.CreateBuilder(args);

			#region Configure Services
			// Add services to the container.

			webApplicationBuilder.Services.AddControllers(); // Register Required Services By ASP.NET Core Web APIs to Dependency Injection Container
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            webApplicationBuilder.Services.AddEndpointsApiExplorer().AddSwaggerGen();

			webApplicationBuilder.Services.AddHttpContextAccessor().AddScoped(typeof(ICurrentUserService), typeof(CurrentUserService));


			//webApplicationBuilder.Services.AddApplicationServices();
			webApplicationBuilder.Services.AddIdentityServices(webApplicationBuilder.Configuration);
			webApplicationBuilder.Services.AddPersistenceServices(webApplicationBuilder.Configuration);
			//webApplicationBuilder.Services.AddInfrastructureServices(webApplicationBuilder.Configuration);


			#endregion

			var app = webApplicationBuilder.Build();

			#region Update Databases Initialization

			await app.InitializeDbAsync();

			#endregion

			#region Configure Kestrel Middlewares
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseHttpsRedirection();

			app.UseStatusCodePagesWithReExecute("/Errors/{0}");

			app.UseStaticFiles();

			app.UseAuthentication();
			app.UseAuthorization();



			app.MapControllers(); 
            #endregion

            app.Run();
        }
    }
}
