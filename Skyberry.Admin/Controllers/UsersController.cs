using System;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using Skyberry.Domain.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class UsersController : _BaseController
    {
        public UsersController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "FirstName, LastName, UserName, Email")] UserSearchCriteria searchCriteria = null)
        {
            UserListVM vm = new UserListVM
            {
                Users = UOW.SkyberryUsers.GetAllPaged(pageSortCriteria, searchCriteria),
                PageSortCriteria = pageSortCriteria,
                SearchCriteria = searchCriteria
            };
            return View(vm);
        }

        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SkyberryUser user = UOW.SkyberryUsers.GetById(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserVM vm = new UserVM
            {
                User = user
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            UserVM vm = new UserVM();
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "User")] SkyberryUser user, [Bind(Include="Password")] string password)
        {

            if (!string.IsNullOrWhiteSpace(user.UserName) && !string.IsNullOrWhiteSpace(password))
            {
                var UserManager = new UserManager<SkyberryUser>(new UserStore<SkyberryUser>(UOW.DbContext));

                SkyberryUser newUser = new SkyberryUser();

                newUser.FirstName = user.FirstName;
                newUser.LastName = user.LastName;
                newUser.UserName = user.UserName;
                newUser.Email = user.Email;
                newUser.CreatedDate = DateTime.Now;
                newUser.Title = user.Title;
                newUser.JobTitle = user.JobTitle;

                var result = UserManager.Create(newUser, password);

                if (result.Succeeded)
                {
                    UserManager.AddToRole(newUser.Id, "Client");
                    user = newUser;
                }
                else
                {
                    AddErrors(result);
                }
            }

            UserVM vm = new UserVM
            {
                User = user
            };

            return View("Edit", vm);
        }

        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SkyberryUser user = UOW.SkyberryUsers.GetById(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserVM vm = new UserVM
            {
                User = user
            };
            return View(vm);
        }

        [HttpPost]
        public ActionResult Edit([Bind(Prefix = "User")] SkyberryUser user, string password = "")
        {
            SkyberryUser dbUser = UOW.SkyberryUsers.GetById(user.Id);
            

            if (dbUser != null)
            {
                dbUser.FirstName = user.FirstName;
                dbUser.LastName = user.LastName;
                dbUser.Email = user.Email;

                if (!String.IsNullOrWhiteSpace(password))
                {
                    SkyberryContext context = new SkyberryContext();
                    UserStore<SkyberryUser> store = new UserStore<SkyberryUser>(context);
                    UserManager<SkyberryUser> UserManager = new UserManager<SkyberryUser>(store);

                    dbUser.PasswordHash = UserManager.PasswordHasher.HashPassword(password);
                }

                dbUser.Title = user.Title;
                dbUser.JobTitle = user.JobTitle;

                UOW.Commit();
                user = dbUser;
            }
            else
            {
                return HttpNotFound();
            }
            UserVM vm = new UserVM
            {
                User = user
            };
            return View(vm);
        }

        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SkyberryUser user = UOW.SkyberryUsers.GetById(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserVM vm = new UserVM
            {
                User = user
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            UserManager<SkyberryUser> UserManager = new UserManager<SkyberryUser>(new UserStore<SkyberryUser>(UOW.DbContext));

            if(user.UserName.ToLower() != "daniel" && user.UserName.ToLower() != "lacey")
            {
                var asyncCall = UserManager.RemoveFromRoleAsync(user.Id, "Client");
                if(asyncCall.Result.Succeeded)
                {
                    UOW.SkyberryUsers.Delete(user);
                    UOW.Commit();

                    return RedirectToAction("Index");
                }

                AddErrors(asyncCall.Result);
            }

            UserVM vm = new UserVM
            {
                User = user
            };
            return View(vm);            
        }







        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
    }
}
