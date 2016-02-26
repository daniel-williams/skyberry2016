using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api.ApiHelpers
{
    public class ApiErrorsResult<T> : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public ApiErrors<T> ApiErrors;

        public ApiErrorsResult(HttpRequestMessage request, HttpStatusCode code, string description, T errors)
        {
            Request = request;
            ApiErrors = new ApiErrors<T>(code, description, errors);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<ApiErrors<T>>(HttpStatusCode.OK, ApiErrors);
            return Task.FromResult(response);
        }
    }
}
