using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiBadRequestResult : IHttpActionResult
    {
        HttpStatusCode _code = HttpStatusCode.BadRequest;
        string _description;
        HttpRequestMessage _request;

        public ApiBadRequestResult(string description, HttpRequestMessage request)
        {
            _description = description;
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
