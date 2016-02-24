using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiOkeyDokeResult : IHttpActionResult
    {
        HttpStatusCode _code = HttpStatusCode.OK;
        string _description = "okeydoke";
        HttpRequestMessage _request;

        public ApiOkeyDokeResult(HttpRequestMessage request)
        {
            _request = request;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = _request.CreateResponse(_code);
            response.Content = new StringContent(JsonConvert.SerializeObject(new
            {
                code = _code,
                description = _description,

            }), Encoding.UTF8, "application/json");

            return Task.FromResult(response);
        }
    }
}
