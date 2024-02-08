using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace MyApplication.Controllers;

[ApiController]
[Route("api/data")]
public class DataController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public DataController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
        var client = _httpClientFactory.CreateClient();
        var requestUri = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
        var response = await client.GetAsync(requestUri);

        if (response.IsSuccessStatusCode)
        {
            var responseData = await response.Content.ReadAsStringAsync();
            return Ok(responseData);
        }

        return StatusCode(500, "Error accessing external service");
    }
}

//outputs to: http://localhost:5295/api/data
//to find PID: sudo lsof -i :5295
//to kill process: sudo kill -9 PID
//to run: cd EsriBackend FOLLOWED BY dotnet run
