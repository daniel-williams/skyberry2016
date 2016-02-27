using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Web.Filters
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                PrettyHttpError error = new PrettyHttpError(actionContext.ModelState);
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.OK, error);
            }
        }
    }

}
