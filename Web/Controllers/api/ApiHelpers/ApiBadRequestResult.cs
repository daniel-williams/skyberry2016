using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiBadRequestResult : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public ApiErrors<Dictionary<string, IEnumerable<string>>> ApiErrors;

        public ApiBadRequestResult(HttpRequestMessage request, Dictionary<string, IEnumerable<string>> errors)
        {
            Request = request;
            ApiErrors = new ApiErrors<Dictionary<string, IEnumerable<string>>>(HttpStatusCode.BadRequest, "Bad Request", errors);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<ApiErrors<Dictionary<string, IEnumerable<string>>>>(HttpStatusCode.BadRequest, ApiErrors);
            return Task.FromResult(response);
        }
    }
}