using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class SkyApiErrors<T> : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public SkyberryErrorsContent<T> SkyberryErrorsContent;

        public SkyApiErrors(HttpRequestMessage request, HttpStatusCode status, string message, T errors)
        {
            Request = request;
            SkyberryErrorsContent = new SkyberryErrorsContent<T>(status, message, errors);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<SkyberryErrorsContent<T>>(HttpStatusCode.OK, SkyberryErrorsContent);
            return Task.FromResult(response);
        }
    }
}
