using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiResult : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public ApiBase ApiBase; 

        public ApiResult(HttpRequestMessage request, HttpStatusCode code, string description)
        {
            Request = request;
            ApiBase = new ApiBase(code, description);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<ApiBase>(HttpStatusCode.OK, ApiBase);
            return Task.FromResult(response);
        }
    }
}
