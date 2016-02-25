using Microsoft.AspNet.Identity;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [HttpPost]
        [Route("email")]
        public IHttpActionResult UpdateEmail([FromBody]UpdateEmailBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if(user == null)
            {
                return new ApiNotFoundResult(Request);
            }

            user.Email = model.email;
            UOW.Commit();

            return new ApiPayloadResult<UpdateEmailBM>(Request, model);
        }

        [HttpPost]
        [Route("username")]
        public IHttpActionResult UpdateUsername([FromBody]UpdateUsernameBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if (user == null)
            {
                return new ApiNotFoundResult(Request);
            }

            user.UserName = model.username;
            UOW.Commit();

            return new ApiPayloadResult<UpdateUsernameBM>(Request, model);
        }

        [HttpPost]
        [Route("password")]
        public IHttpActionResult UpdatePassword([FromBody]UpdatePasswordBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if (user == null)
            {
                return new ApiNotFoundResult(Request);
            }
            if(!UserManager.CheckPassword(user, model.OldPassword))
            {
                return new ApiBadRequestResult("Current password is incorrect.", Request);
            }
            if(model.NewPassword != model.ConfirmPassword)
            {
                return new ApiBadRequestResult("Confirm password does not match new password.", Request);
            }

            user.PasswordHash = UserManager.PasswordHasher.HashPassword(model.NewPassword);
            UOW.Commit();

            return new ApiOkeyDokeResult(Request);
        }
    }

    public class UpdateEmailBM
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string email { get; set; }
    }

    public class UpdateUsernameBM
    {
        [Required(ErrorMessage = "Username is required.")]
        public string username { get; set; }
    }

    public class UpdatePasswordBM
    {
        [Required(ErrorMessage = "Current password is required.")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Confirm password does not match new password.")]
        public string ConfirmPassword { get; set; }
    }
}
