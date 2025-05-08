using FCIH.ArtGallery.Core.Application.Abstraction.Logging;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FCIH.ArtGallery.Infrastructure.Persistence.Logging
{
	public class LoggerManager(ILogger<LoggerManager> logger) : ILoggerManager
	{
		private readonly ILogger<LoggerManager> _logger = logger;

		public void LogDebug(string message) => _logger.LogDebug(message);

		public void LogError(string message) => _logger.LogError(message);

		public void LogInfo(string message) => _logger.LogInformation(message);

		public void LogWarn(string message) => _logger.LogWarning(message);
	}
}
