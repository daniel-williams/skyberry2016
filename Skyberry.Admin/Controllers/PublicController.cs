using Dob.UI.Web.Infrastructure;
using Skyberry.Domain;
using Skyberry.Admin.Infrastructure;
using Skyberry.Admin.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Skyberry.Admin.Controllers
{
    [RequireHttp]
    public class PublicController : _BaseController
    {
        public PublicController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }


        public ActionResult Skyberry()
        {
            return View();
        }

        public ActionResult OurClients()
        {
            return View();
        }

        public ActionResult ClientTestimonials()
        {
            return View();
        }

        public ActionResult ToolsAndResources()
        {
            return View();
        }

        public ActionResult NewsAndPress()
        {
            return View();
        }

        public ActionResult Opportunities()
        {
            return View();
        }

        public ActionResult SupportAndFAQ()
        {
            return View();
        }

        public ActionResult SubscribeToNewsletter()
        {
            return View();
        }

        public ActionResult PrivacyPolicy()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ContactUsVM vm = new ContactUsVM();
            return View(vm);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateAntiForgeryToken]
        [ActionName("Contact")]
        public ActionResult Contact(ContactUsVM contactUsVM)
        {
            bool received = false;
            if (ModelState.IsValid)
            {
                string description = "Skyberry Contact Us Submission";

                StringBuilder body = new StringBuilder();
                body.Append("<table cellpadding='3' border='0'>");
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Email", contactUsVM.Email);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Regarding", contactUsVM.Regarding);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Details", contactUsVM.Comment);
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Subscribe", contactUsVM.Subscribe ? "yes" : "no");
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Timestamp", DateTime.UtcNow.AddHours(-8).ToString("MM/dd/yyyy @ h:mm tt"));
                body.AppendFormat("<tr><td style='background-color:#d7d7d7;white-space:nowrap;text-align:right;vertical-align:top;'><strong>{0}</strong></td><td style='background-color:#e6e6e5;text-align:left;vertical-align:top;'>{1}</td></tr>", "Users IP", HtmlUtil.GetUserIP());
                body.Append("</table>");

                MailMessage message = new MailMessage();
                message.From = new MailAddress(contactUsVM.Email);
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

            ContactUsVM vm = contactUsVM;
            vm.Received = received;
            return View(vm);
        }

        public ActionResult Creative()
        {
            return View();
        }

        public ActionResult Development()
        {
            return View();
        }

        public ActionResult Portfolio()
        {
            return View();
        }

        public ActionResult Blog()
        {
            return View();
        }





        public JsonResult PortfolioFilters(string parent = "")
        {
            List<string> result = UOW.Tags.PortfolioFilters(parent);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PortfolioImages(string filter1 = "", string filter2 = "")
        {
            List<Image> images = UOW.Images.PortfolioImages(filter1, filter2);

            return this.Json(images, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PortfolioImageSet(Guid id)
        {
            PortfolioImageSetVM result = new PortfolioImageSetVM
            {
                ImageSet = UOW.ImageSets.PortfolioImageSet(id)
            };

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFeatured()
        {
            List<Testimonial> testimonials = UOW.Testimonials.GetFeatured();

            List<string> result = testimonials.Select(e => e.Description).ToList();

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }








        public ActionResult NotFound()
        {
            return View();
        }
    }
}