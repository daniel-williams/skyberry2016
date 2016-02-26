using System.Net;

namespace Web.Controllers.api
{
    public class ApiPayload<T> : ApiBase
    {
        public T Payload { get; set; }

        public ApiPayload(HttpStatusCode code, string description, T payload) : base(code, description)
        {
            Payload = payload;
        }
    }
}
