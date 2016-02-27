using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Web.Filters;

namespace Web.Controllers.api
{
    public class SkyApiBadRequest : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public PrettyHttpError Error;

        public SkyApiBadRequest(HttpRequestMessage request, PrettyHttpError error)
        {
            Request = request;
            Error = error;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<PrettyHttpError>(HttpStatusCode.OK, Error);
            return Task.FromResult(response);
        }
    }
}