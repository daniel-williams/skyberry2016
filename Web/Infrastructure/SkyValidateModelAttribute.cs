using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Web.Infrastructure
{
    public class SkyValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                SkyModelStateError error = new SkyModelStateError(actionContext.ModelState);
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.OK, error);
            }
        }
    }

}
