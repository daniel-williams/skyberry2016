using System.Net;
using System.Net.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Results;
using Web.Infrastructure;

namespace Web.Infrastructure
{
    // Skyberry global exception handler
    public class SkyExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            SkyExceptionError error = new SkyExceptionError(context.Exception);
            context.Result = new ResponseMessageResult(context.Request.CreateResponse(HttpStatusCode.OK, error));
        }
    }
}
