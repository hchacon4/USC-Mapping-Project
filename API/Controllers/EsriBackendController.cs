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

    [HttpGet("{title}")]
    public IActionResult GetLayerByName(string title)
    {
        var layers = new Dictionary<string, string>
        {
            {"LARIAC5-05", "PICT-LARIAC5--u6URKu1Fx3"},
            {"LARIAC5-02", "PICT-LARIAC5--SxmDvXHvYJ"},
            {"LARIAC5-01", "PICT-LARIAC5--tF2dpXHbsU"},
            {"LARIAC5-04", "PICT-LARIAC5--SasdJh4Z71"},
            {"LARIAC5-03", "PICT-LARIAC5--pQuVE58lXl"},
            {"LARIAC4-01", "PICT-LARIAC4--NQvK5pJZwy"},
            {"LARIAC6-01", "PICT-LARIAC6--hT7yCcKe4I"},
            {"LARIAC7-01", "PICT-LARIAC7--wWaG7ZZTYR"},
            {"LARIAC7-02", "PICT-LARIAC7--KCrSFBeqgG"},
            {"LARIAC6-03", "PICT-LARIAC6--LeGqMjqN6p"},
            {"LARIAC6-09", "PICT-LARIAC6--X1dnmhXZf9"},
            {"LARIAC6-07", "PICT-LARIAC6--IftnvGu8Pc"},
            {"LARIAC6-02", "PICT-LARIAC6--pCqXruF2NL"},
            {"LARIAC6-05", "PICT-LARIAC6--gsBZ87kcdi"},
            {"LARIAC6-06", "PICT-LARIAC6--lv9tMfcVWo"},
            {"LARIAC6-04", "PICT-LARIAC6--pQjhm1WxCC"},
            {"LARIAC6-08", "PICT-LARIAC6--LXMv769zxs"}
        };

        if (layers.ContainsKey(title))
        {
            var response = new
            {
                url = "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms",
                layer = layers[title]
            };
            return Ok(response);
        }
        else
        {
            return NotFound("Layer not found.");
        }
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

// LARIAC5-05 (2019 Saddleridge Fire RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC5-05
// LARIAC5-02 (2018 Woolsey Fire RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC5-02
// LARIAC5-01 (2017 AccuPlus Winter Countywide RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC5-01
// LARIAC5-04 (2019 Fall Urban RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC5-04
// LARIAC5-03 (2019 Spring Urban RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC5-03
// LARIAC4-01 (2014 AccuPlus Winter Countywide RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC4-01
// LARIAC6-01 (2020 AccuPlus Winter Countywide IR Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-01
// LARIAC7-01 (2023 AccuPlus Winter Countywide IR Ortho)
// http://localhost:5053/EsriBackend/LARIAC7-01
// LARIAC7-02 (2023 AccuPlus Winter Countywide RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC7-02
// LARIAC6-03 (2020 Bobcat and Lake Fires RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-03
// LARIAC6-09 (2022 Summer Urban RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-09
// LARIAC6-07 (2022 Bobcat Fire Re-fly RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-07
// LARIAC6-02 (2020 AccuPlus Winter Countywide RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-02
// LARIAC6-05 (2021 Fall Urban IR Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-05
// LARIAC6-06 (2021 Spring Urban RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-06
// LARIAC6-04 (2021 Spring Urban RGB Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-04
// LARIAC6-08 (2022 Summer Urban IR Ortho)
// http://localhost:5053/EsriBackend/LARIAC6-08