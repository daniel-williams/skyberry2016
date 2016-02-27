using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Web.Infrastructure;

namespace Web.Controllers.api
{
    public class SkyApiBadRequest : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public SkyModelStateError Error;

        public SkyApiBadRequest(HttpRequestMessage request, SkyModelStateError error)
        {
            Request = request;
            Error = error;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<SkyModelStateError>(HttpStatusCode.OK, Error);
            return Task.FromResult(response);
        }
    }
}