using Microsoft.AspNet.Identity;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [Route("{id}")]
        public IHttpActionResult Get(string id)
        {
            if(UserIdentity.GetUserId() == id || UserRoles.Contains("Admin"))
            {
                SkyberryUser user = UOW.SkyberryUsers.GetDashboardInfo(id);
                UserVM userVM = ModelFactory.CreateUserVM(user, UserRoles);

                return Ok(userVM);
            }
            return NotFound();
        }

        [Route("{id}/accounts")]
        public IHttpActionResult GetAccounts(string id)
        {
            if (UserIdentity.GetUserId() == id || UserRoles.Contains("Admin"))
            {
                List<Account> accounts = UOW.Accounts.GetByUserId(id);
                List<AccountVM> accountList = accounts.Select(e => ModelFactory.CreateAccountVM(e)).ToList();

                return Ok(accountList);
            }
            return NotFound();
        }
    }
}
