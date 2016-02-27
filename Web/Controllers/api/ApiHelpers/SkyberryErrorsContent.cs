using System.Net;

namespace Web.Controllers.api
{
    public class SkyberryErrorsContent<T> : SkyberryContent
    {
        public T Errors { get; set; }

        public SkyberryErrorsContent(HttpStatusCode status, string message, T errors) : base(status, message)
        {
            Errors = errors;
        }
    }
}
