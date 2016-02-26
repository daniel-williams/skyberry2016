using System.Net;

namespace Web.Controllers.api
{
    public class ApiErrors<T> : ApiBase
    {
        public T Errors { get; set; }

        public ApiErrors(HttpStatusCode code, string description, T errors) : base(code, description)
        {
            Errors = errors;
        }
    }
}
