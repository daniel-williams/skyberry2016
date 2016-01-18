using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Linq;
using Newtonsoft.Json;

using ModelBinding = System.Web.Http.ModelBinding;


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
                }));
            }
        }
    }

    public static class ModelStateExtensions
    {
        public static Dictionary<string, IEnumerable<string>> ToErrorDictionary(
            this ModelBinding.ModelStateDictionary modelState,
            bool camelCaseKeyName = true
        )
        {
            var errors = modelState
                .Where(x => x.Value.Errors.Any())
                .ToDictionary(
                    kvp => CamelCasePropNames(kvp.Key),
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage)
                );

            return errors;
        }

        private static string CamelCasePropNames(string propName)
        {
            var array = propName.Split('.');
            var camelCaseList = new string[array.Length];
            for (var i = 0; i < array.Length; i++)
            {
                var prop = array[i];
                camelCaseList[i] = prop.Substring(0, 1).ToLower() + prop.Substring(1, prop.Length - 1);
            }

            return string.Join(".", camelCaseList);
        }
    }
}