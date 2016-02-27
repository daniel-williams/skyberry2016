using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class SkyApiPayload<T> : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public SkyberryPayloadContent<T> Payload;

        public SkyApiPayload(HttpRequestMessage request, T payload)
        {
            Request = request;
            Payload = new SkyberryPayloadContent<T>(HttpStatusCode.OK, "okeydoke", payload);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<SkyberryPayloadContent<T>>(HttpStatusCode.OK, Payload);
            return Task.FromResult(response);
        }
    }
}
