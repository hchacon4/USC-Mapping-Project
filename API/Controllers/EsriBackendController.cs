using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class EsriBackendController : ControllerBase
{
    private readonly ILogger<EsriBackendController> _logger;
    private readonly HttpClient _httpClient;

    public EsriBackendController(ILogger<EsriBackendController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpGet("GetBaseMap")]
    public async Task<IActionResult> GetBaseMap()
    {
        return await GetLayerData("https://tiles.arcgis.com/tiles/RmCCgQtiZLDCtblq/arcgis/rest/services/LA_County_Basemap_Source/VectorTileServer");
    }

    [HttpGet("GetHighResImagery2014")]
    public async Task<IActionResult> GetHighResImagery2014()
    {
        return await GetLayerData("https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2014/MapServer");
    }

    [HttpGet("GetMapCacheLayers")]
    public async Task<IActionResult> GetMapCacheLayers()
    {
        return await GetLayerData("https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache");
    }

    [HttpGet("GetDynamicLayers")]
    public async Task<IActionResult> GetDynamicLayers()
    {
        return await GetLayerData("https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic");
    }

    private async Task<IActionResult> GetLayerData(string baseUrl)
    {
        try
        {
            var response = await _httpClient.GetAsync(baseUrl);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return Ok(content);
            }
            return StatusCode((int)response.StatusCode, response.ReasonPhrase);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, $"Error fetching data from {baseUrl}");
            return StatusCode(500, "Internal server error");
        }
    }
}


//Base Map: http://localhost:5053/EsriBackend/GetBaseMap
//2014 High-Res Imagery: http://localhost:5053/EsriBackend/GetHighResImagery2014
//Map Cache Layers: http://localhost:5053/EsriBackend/GetMapCacheLayers
//Dynamic Layers: http://localhost:5053/EsriBackend/GetDynamicLayers
