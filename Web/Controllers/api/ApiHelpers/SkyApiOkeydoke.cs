using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class SkyApiOkeydoke : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public SkyberryContent SkyberryContent;

        public SkyApiOkeydoke(HttpRequestMessage request)
        {
            Request = request;
            SkyberryContent = new SkyberryContent(HttpStatusCode.OK, "okeydoke");
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, SkyberryContent);
            return Task.FromResult(response);
        }
    }
}
