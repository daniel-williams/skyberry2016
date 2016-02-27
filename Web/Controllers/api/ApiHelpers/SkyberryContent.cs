using System.Net;

namespace Web.Controllers.api
{
    public class SkyberryContent
    {
        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }

        public SkyberryContent(HttpStatusCode status, string message)
        {
            Status = status;
            Message = message;
        }
    }

}