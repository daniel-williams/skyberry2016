using Skyberry.Domain;
using Skyberry.Admin.Infrastructure;
using System;
using System.IO;
using System.Linq;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Routing;

namespace Skyberry.Admin.Controllers
{
    public class _BaseController : Controller
    {
        protected IUnitOfWork UOW { get; set; }
        protected ICacheProvider Cache;

        public _BaseController(IUnitOfWork uow, ICacheProvider cache)
        {
            this.UOW = uow;
            this.Cache = cache;
            this.ItemsPerPage = 50;
        }

        private string _StorageRoot;
        protected string StorageRoot
        {
            get
            {
                if (string.IsNullOrEmpty(_StorageRoot))
                {
                    _StorageRoot = Path.Combine(WebConfigurationManager.AppSettings["DIR_FILE_UPLOADS"]);
                }
                return _StorageRoot;
            }
        }


        protected string GetMimeType(string filePath)
        {
            return GetMimeType(new FileInfo(filePath));
        }
        protected string GetMimeType(FileInfo file)
        {
            return MimeTypes.GetMimeType(file.Extension);
        }


        protected int ItemsPerPage { get; set; }

        #region Override to reroute to non-SSL port if controller action does not have RequireHttps attribute to save on CPU
        // By L. Keng, 2012/08/27
        // Note that this code works with RequireHttps at the controller class or action level.
        // Credit: Various stackoverflow.com posts and http://puredotnetcoder.blogspot.com/2011/09/requirehttps-attribute-in-mvc3.html
        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            // if the controller class or the action has RequireHttps attribute
            var requireHttps = (filterContext.ActionDescriptor.ControllerDescriptor.GetCustomAttributes(typeof(RequireHttpsAttribute), true).Count() > 0
                                || filterContext.ActionDescriptor.GetCustomAttributes(typeof(RequireHttpsAttribute), true).Count() > 0);
            if (Request.IsSecureConnection)
            {
                // If request has a secure connection but we don't need SSL, and we are not on a child action   
                if (!requireHttps && !filterContext.IsChildAction)
                {
                    var uriBuilder = new UriBuilder(Request.Url)
                    {
                        Scheme = "http",
                        Port = 80
                    };
                    filterContext.Result = this.Redirect(uriBuilder.Uri.AbsoluteUri);
                }
            }
            else
            {
                // If request does not have a secure connection but we need SSL, and we are not on a child action   
                if (requireHttps && !filterContext.IsChildAction)
                {
                    var uriBuilder = new UriBuilder(Request.Url)
                    {
                        Scheme = "https",
                        Port = 443
                    };
                    filterContext.Result = this.Redirect(uriBuilder.Uri.AbsoluteUri);
                }
            }
            base.OnAuthorization(filterContext);
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            UOW.Dispose();
            base.Dispose(disposing);
        }
    }
}
