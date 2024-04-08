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

      [HttpGet("GetFieldBooks")]
    public async Task<IActionResult> GetFieldBooks()
    {
        return await GetLayerData("https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/FieldBooks_AMP/MapServer");
    }

    [HttpGet("GetClusters")]
    public async Task<IActionResult> GetClusters()
    {
        return await GetLayerData("https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/Clusters_SFR_AMP/MapServer/5");
    }

    [HttpGet("GetRecentSales")]
    public async Task<IActionResult> GetRecentSales()
    {
        return await GetLayerData("https://assessor.gis.lacounty.gov/oota/rest/services/PAIS/pais_sales_parcels/MapServer");
    }

    [HttpGet("GetSchoolDistrict")]
    public async Task<IActionResult> GetSchoolDistrict()
    {
        return await GetLayerData("https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Political_Boundaries/MapServer/25");
    }

    [HttpGet("GetPLSSMap")]
    public async Task<IActionResult> GetPLSSMap()
    {
        return await GetLayerData("https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer");
    }

    [HttpGet("GetWmsData")]
    public IActionResult GetWmsData()
    {
        var wmsData = new
        {
            url = "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms",
            layer = "=LayerString"
        };

        return Ok(wmsData);
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
//Field Books: http://localhost:5053/EsriBackend/GetFieldBooks
//Clusters: http://localhost:5053/EsriBackend/GetClusters
//Recent Sales: http://localhost:5053/EsriBackend/GetRecentSales
//School District: http://localhost:5053/EsriBackend/GetSchoolDistrict
//PLSS Map: http://localhost:5053/EsriBackend/GetPLSSMap
//WMS: http://localhost:5053/EsriBackend/GetWmsData