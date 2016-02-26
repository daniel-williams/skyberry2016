using System.Net;

namespace Web.Controllers.api
{
    public class ApiBase
    {
        public HttpStatusCode Code { get; set; }
        public string Description { get; set; }

        public ApiBase(HttpStatusCode code, string description)
        {
            Code = code;
            Description = description;
        }
    }

}