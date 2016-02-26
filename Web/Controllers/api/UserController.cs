using Microsoft.AspNet.Identity;
using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http;
using Web.Controllers.api;
using Web.Extensions;
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
            if(model.newEmail != model.confirmEmail)
            {
                ModelState.AddModelError("confirmEmail", "Confirm Email and New Email must match.");
                return new ApiBadRequestResult(Request, ModelState.ToErrorDictionary());
            }

            user.Email = model.newEmail;
            UOW.Commit();

            UpdateEmailVM payload = new UpdateEmailVM
            {
                email = user.Email,
            };

            return new ApiPayloadResult<UpdateEmailVM>(Request, payload);
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

            user.UserName = model.NewUsername;
            UOW.Commit();

            UpdateUsernameVM payload = new UpdateUsernameVM
            {
                Username = user.UserName,
            };

            return new ApiPayloadResult<UpdateUsernameVM>(Request, payload);
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
            if(!UserManager.CheckPassword(user, model.OldPass))
            {
                ModelState.AddModelError("oldPass", "Current password is incorrect.");
                return new ApiBadRequestResult(Request, ModelState.ToErrorDictionary());
            }
            if(model.NewPass != model.ConfirmPass)
            {
                ModelState.AddModelError("confirmPass", "Confirm Password and New Password must match.");
                return new ApiBadRequestResult(Request, ModelState.ToErrorDictionary());
            }

            user.PasswordHash = UserManager.PasswordHasher.HashPassword(model.NewPass);
            UOW.Commit();

            return new ApiOkeyDokeResult(Request);
        }
    }

    public class UpdateEmailBM
    {
        [Required(ErrorMessage = "New Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string newEmail { get; set; }

        [Required(ErrorMessage = "Confirm Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Compare("NewPass", ErrorMessage = "Confirm Email and New Email must match.")]
        public string confirmEmail { get; set; }
    }
    public class UpdateEmailVM
    {
        public string email { get; set; }
    }

    public class UpdateUsernameBM
    {
        [Required(ErrorMessage = "Username is required.")]
        public string NewUsername { get; set; }

        [Required(ErrorMessage = "Confirm Username is required.")]
        [Compare("NewUsername", ErrorMessage = "Confirm Username and New Username must match.")]
        public string ConfirmUsername { get; set; }
    }

    public class UpdateUsernameVM
    {
        public string Username { get; set; }
    }

    public class UpdatePasswordBM
    {
        [Required(ErrorMessage = "Current Password is required.")]
        [DataType(DataType.Password)]
        public string OldPass { get; set; }

        [Required(ErrorMessage = "New Password is required.")]
        [DataType(DataType.Password)]
        public string NewPass { get; set; }

        [Required(ErrorMessage = "Confirm Password is required.")]
        [DataType(DataType.Password)]
        [Compare("NewPass", ErrorMessage = "Confirm Password and New Password must match.")]
        public string ConfirmPass { get; set; }
    }
}
