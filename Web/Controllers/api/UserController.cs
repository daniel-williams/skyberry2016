using Microsoft.AspNet.Identity;
using Skyberry.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http;
using Web.Controllers.api;
using Web.Infrastructure;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UserController : _BaseApiController
    {

        [Route("")]
        public IHttpActionResult Get()
        {
            SkyberryUser user = UOW.SkyberryUsers.GetDashboardInfo(UserIdentity.GetUserId());
            UserVM userVM = ModelFactory.CreateUserVM(user, UserRoles);

            return new SkyApiPayload<UserVM>(Request, userVM);
        }

        [Route("{id}")]
        public IHttpActionResult Get(string id)
        {
            if (id != UserIdentity.GetUserId() && !UserRoles.Contains("Admin"))
            {
                return new SkyApiNotFound(Request);
            }

            SkyberryUser user = UOW.SkyberryUsers.GetDashboardInfo(id);
            if(user == null)
            {
                return new SkyApiNotFound(Request);
            }

            UserVM userVM = ModelFactory.CreateUserVM(user, UserRoles);
            return new SkyApiPayload<UserVM>(Request, userVM);
        }

        [Route("{id}/accounts")]
        public IHttpActionResult GetAccounts(string id)
        {
            if (id != UserIdentity.GetUserId() && !UserRoles.Contains("Admin"))
            {
                return new SkyApiNotFound(Request);
            }

            List<Account> accounts = UOW.Accounts.GetByUserId(id);
            List<AccountVM> accountVMs = accounts.Select(e => ModelFactory.CreateAccountVM(e)).ToList();

            return new SkyApiPayload<List<AccountVM>>(Request, accountVMs);
        }

        [HttpPost]
        [SkyValidateModel]
        [Route("email")]
        public IHttpActionResult UpdateEmail([FromBody]UpdateEmailBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if(user == null)
            {
                return new SkyApiNotFound(Request);
            }

            user.Email = model.NewEmail;
            UOW.Commit();

            UpdateEmailVM payload = new UpdateEmailVM
            {
                Email = user.Email,
            };

            return new SkyApiPayload<UpdateEmailVM>(Request, payload);
        }

        [HttpPost]
        [SkyValidateModel]
        [Route("username")]
        public IHttpActionResult UpdateUsername([FromBody]UpdateUsernameBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if (user == null)
            {
                return new SkyApiNotFound(Request);
            }

            user.UserName = model.NewUsername;
            UOW.Commit();

            UpdateUsernameVM payload = new UpdateUsernameVM
            {
                Username = user.UserName,
            };

            return new SkyApiPayload<UpdateUsernameVM>(Request, payload);
        }

        [HttpPost]
        [SkyValidateModel]
        [Route("password")]
        public IHttpActionResult UpdatePassword([FromBody]UpdatePasswordBM model)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(UserIdentity.GetUserId());
            if (user == null)
            {
                return new SkyApiNotFound(Request);
            }
            if(!UserManager.CheckPassword(user, model.OldPass))
            {
                ModelState.AddModelError("oldPass", "Current password is incorrect.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            user.PasswordHash = UserManager.PasswordHasher.HashPassword(model.NewPass);
            UOW.Commit();

            return new SkyApiOkeydoke(Request);
        }
    }

    public class UpdateEmailBM
    {
        [Required(ErrorMessage = "New Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string NewEmail { get; set; }

        [Required(ErrorMessage = "Confirm Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Compare("NewEmail", ErrorMessage = "Confirm Email and New Email must match.")]
        public string ConfirmEmail { get; set; }
    }
    public class UpdateEmailVM
    {
        public string Email { get; set; }
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
