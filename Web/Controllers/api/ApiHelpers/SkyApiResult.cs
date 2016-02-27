using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class SkyApiResult : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public SkyberryContent SkyberryContent; 

        public SkyApiResult(HttpRequestMessage request, HttpStatusCode status, string message)
        {
            Request = request;
            SkyberryContent = new SkyberryContent(status, message);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<SkyberryContent>(HttpStatusCode.OK, SkyberryContent);
            return Task.FromResult(response);
        }
    }
}
