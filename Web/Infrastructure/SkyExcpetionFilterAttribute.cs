using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace Web.Infrastructure
{
    public class SkyExcpetionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            SkyExceptionError error = new SkyExceptionError(actionExecutedContext.Exception);
            actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse(HttpStatusCode.OK, error);
        }
    }
}