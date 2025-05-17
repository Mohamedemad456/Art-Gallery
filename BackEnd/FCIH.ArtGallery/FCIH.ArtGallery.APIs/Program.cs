using FCIH.ArtGallery.APIs.Controllers.Errors;
using FCIH.ArtGallery.APIs.Extensions;
using FCIH.ArtGallery.APIs.Middlewares;
using FCIH.ArtGallery.Core.Application;
using FCIH.ArtGallery.Core.Application.Abstraction.Common;
using FCIH.ArtGallery.Infrastructure;
using FCIH.ArtGallery.Infrastructure.Persistence;
using FCIH.ArtGallery.Infrastructure.Services;
using FCIH.ArtGallery.Infrastructure.SignalR;
using Microsoft.AspNetCore.Mvc;

namespace FCIH.ArtGallery.APIs
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var webApplicationBuilder = WebApplication.CreateBuilder(args);

			#region Configure Services
			// Add services to the container.

			webApplicationBuilder.Services.AddControllers()
				.ConfigureApiBehaviorOptions(options =>
				{
					options.SuppressModelStateInvalidFilter = false;
					options.InvalidModelStateResponseFactory = (actionContext) =>
					{
						var errors = actionContext.ModelState.Where(P => P.Value!.Errors.Count > 0)
									   .Select(P => new ApiValidationErrorResponse.ValidationError()
									   {
										   Field = P.Key,
										   Errors = P.Value!.Errors.Select(E => E.ErrorMessage)
									   });
						return new BadRequestObjectResult(new ApiValidationErrorResponse()
						{
							Errors = errors
						});
					};
				}).AddApplicationPart(typeof(Controllers.AssemblyInformation).Assembly); // Register Required Services By ASP.NET Core Web APIs to Dependency Injection Container
			
			
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            webApplicationBuilder.Services.AddEndpointsApiExplorer().AddSwaggerGen();

			webApplicationBuilder.Services.AddHttpContextAccessor().AddScoped(typeof(ICurrentUserService), typeof(CurrentUserService));

			// Add CORS configuration
			webApplicationBuilder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowLocalhost5173", builder =>
				{
					builder.WithOrigins(
						"http://localhost:5173",
						"https://localhost:5173",
						"http://localhost:7043",
						"https://localhost:7043"
					)
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials();
				});
			});

			webApplicationBuilder.Services.AddInfrastructureServices(webApplicationBuilder.Configuration);
			webApplicationBuilder.Services.AddApplicationServices();
			webApplicationBuilder.Services.AddIdentityServices(webApplicationBuilder.Configuration);
			webApplicationBuilder.Services.AddPersistenceServices(webApplicationBuilder.Configuration);


			#endregion

			var app = webApplicationBuilder.Build();

			#region Update Databases Initialization

			await app.InitializeDbAsync();

			#endregion

			#region Configure Kestrel Middlewares
			// Configure the HTTP request pipeline.

			app.UseMiddleware<ExceptionHandlerMiddleware>();

			if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


			app.MapHub<BidHub>("/bidHub");

			app.UseHttpsRedirection();

			// Enable CORS
			app.UseCors("AllowLocalhost5173");

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
