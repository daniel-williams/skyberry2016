using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Skyberry.Domain;
using System.IO;
using System.Web.Configuration;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles="Admin")]
    public class AdminController : _BaseController
    {
        public AdminController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Extract()
        {
            List<Guid> docIds = UOW.Documents.GetAllIds();

            foreach (Guid gId in docIds)
            {
                SkyberryContext db = new SkyberryContext();
                Document doc = db.Documents.Find(gId);

                using (BinaryWriter fileCreate = new BinaryWriter(System.IO.File.Open(WebConfigurationManager.AppSettings["DIR_FILE_UPLOADS"] + "\\" + doc.Filename, FileMode.Create)))
                {
                    fileCreate.Write(doc.FileData);
                    fileCreate.Close();
                }

                doc = null;
                db.Dispose();
                db = null;
            }

            return View();
        }

        public async Task<ActionResult> ResetPasswords()
        {
            SkyberryContext context = new SkyberryContext();
            UserStore<SkyberryUser> store = new UserStore<SkyberryUser>(context);
            UserManager<SkyberryUser> UserManager = new UserManager<SkyberryUser>(store);
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            var cUsers = UserManager.Users.ToList();

            foreach (var cUser in cUsers)
            {
                String hashedNewPassword = UserManager.PasswordHasher.HashPassword(cUser.OldPassword ?? "p4ssL3tt3rs");
                await store.SetPasswordHashAsync(cUser, hashedNewPassword);
                await store.UpdateAsync(cUser);
            }


            if (!RoleManager.RoleExists("Admin"))
            {
                var adminIR = RoleManager.Create(new IdentityRole("Admin"));
            }

            if (!RoleManager.RoleExists("Client"))
            {
                var clientIR = RoleManager.Create(new IdentityRole("Client"));
            }

            foreach (SkyberryUser user in UserManager.Users.ToList())
            {
                UserManager.AddToRole(user.Id, "Client");
                if (user.UserName == "daniel" || user.UserName == "lacey")
                {
                    UserManager.AddToRole(user.Id, "Admin");
                }
            }

            return View();
        }
	}
}