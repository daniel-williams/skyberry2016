using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Linq;
using Newtonsoft.Json;

using ModelBinding = System.Web.Http.ModelBinding;
using System.Text;

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
                    kvp => StripModelStateKeys(kvp.Key),
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage)
                );

            return errors;
        }

        private static string StripModelStateKeys(string propName)
        {
            return propName.IndexOf('.') >=0 ? propName.Substring(propName.LastIndexOf('.') + 1) : propName;
            
        }
        private static string CamelCasePropNames(string propName)
        {
            System.Diagnostics.Debug.Write(propName);
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