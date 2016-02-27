using System.Net;

namespace Web.Controllers.api
{
    public class SkyberryPayloadContent<T> : SkyberryContent
    {
        public T Payload { get; set; }

        public SkyberryPayloadContent(HttpStatusCode status, string message, T payload) : base(status, message)
        {
            Payload = payload;
        }
    }
}
