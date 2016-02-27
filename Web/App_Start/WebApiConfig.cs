using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http;
using System.Web.Http.Validation;
using Web.Filters;

namespace Web
{
    public static class WebApiConfig
    {
        //http://www.asp.net/web-api/overview/web-api-routing-and-actions/routing-in-aspnet-web-api
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));


            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            // prevent circular references
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            // Prefer explicit attribute routing. Look to controllers for routes
            config.MapHttpAttributeRoutes();

            config.Services.Replace(typeof(IBodyModelValidator), new PrefixlessBodyModelValidator(config.Services.GetBodyModelValidator()));

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{action}/{id}",
            //    defaults: new {action = "Get", id = RouteParameter.Optional }
            //);

        }
    }
}
