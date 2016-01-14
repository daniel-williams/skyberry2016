using Microsoft.AspNet.Identity;
using Skyberry.Domain;
using System.Web.Http;
using Web.Controllers.api;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UserController : _BaseApiController
    {

        [Route("")]
        public UserVM Get()
        {
            SkyberryUser user = UOW.SkyberryUsers.GetDashboardInfo(UserIdentity.GetUserId());
            UserVM userVM = ModelFactory.CreateUserVM(user, UserRoles);
            return userVM;
        }

    }
}
