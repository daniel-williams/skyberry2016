using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiPayloadResult<T> : IHttpActionResult
    {
        private T _content;
        private HttpStatusCode _code = HttpStatusCode.OK;
        private string _description = "okeydoke";
        private HttpRequestMessage _request;

        public ApiPayloadResult(HttpRequestMessage request, T content)
        {
            _request = request;
            _content = content;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = _request.CreateResponse(_code);
            response.Content = new StringContent(JsonConvert.SerializeObject(new
            {
                code = _code,
                description = _description,
                payload = _content,
            }), Encoding.UTF8, "application/json");

            return Task.FromResult(response);
        }
    }
}
