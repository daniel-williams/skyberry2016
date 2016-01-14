using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Skyberry.Domain;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.api
{
    // HTTP/1.1 Spec - POST

    // from tools.ietf.org/html/rfc7231#section-4.3

    // If one or more resources has been created on the origin server as a
    // result of successfully processing a POST request, the origin server
    // SHOULD send a 201 (Created) response containing a Location header
    // field that provides an identifier for the primary resource created
    // (Section 7.1.2) and a representation that describes the status of the
    // request while referring to the new resource(s).

    public class _BaseApiController : ApiController
    {
        protected IUnitOfWork UOW { get; set; }
        protected ICacheProvider Cache;


        public _BaseApiController()
        {
            this.UOW = new UnitOfWork();
            //this.Cache = cache;
        }

        private SkyberryUser _user;


        public ApplicationUserManager UserManager
        {
            get { return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
        }

        public ClaimsIdentity UserIdentity
        {
            get
            {
                return User.Identity as ClaimsIdentity;
            }
        }

        public string UserIdentityId
        {
            get
            {
                var user = UserManager.FindByName(User.Identity.Name);
                return user.Id;
            }
        }

        public SkyberryUser UserRecord
        {
            get
            {
                if (_user != null)
                {
                    return _user;
                }
                _user = UserManager.FindByName(User.Identity.Name);
                return _user;
            }
            set { _user = value; }
        }

        private IList<string> _UserRoles;
        public IList<string> UserRoles
        {
            get
            {
                if(_UserRoles == null)
                {
                    _UserRoles = UserManager.GetRoles(UserIdentityId);
                }
                return _UserRoles;
            }
        }

        private ModelFactory _ModelFactory;
        public ModelFactory ModelFactory
        {
            get
            {
                if(_ModelFactory == null)
                {
                    _ModelFactory = new ModelFactory(this.Request, this.UserManager);
                }
                return _ModelFactory;
            }
        }



        protected override void Dispose(bool disposing)
        {
            UOW.Dispose();
            base.Dispose(disposing);
        }
    }
}