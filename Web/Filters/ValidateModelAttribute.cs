using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Web.Extensions;

namespace Web.Filters
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest);
                actionContext.Response.Content = new StringContent(JsonConvert.SerializeObject(new
                {
                    code = HttpStatusCode.BadRequest,
                    errors = actionContext.ModelState.ToErrorDictionary()
                }), Encoding.UTF8, "application/json");
            }
        }
    }

    
}