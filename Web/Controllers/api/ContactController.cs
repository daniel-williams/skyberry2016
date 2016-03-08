using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Web.Infrastructure;

namespace Web.Controllers.api
{
    [RoutePrefix("api/contact")]
    public class ContactController : _BaseApiController
    {
        [HttpPost]
        [SkyValidateModel]
        [Route("")]
        public IHttpActionResult Index([FromBody]ContactBM model)
        {
            if (model == null) {
                ModelState.AddModelError("email", "Email is required.");
                ModelState.AddModelError("message", "Message is required.");
            }

            if(ModelState.IsValid)
            {
                // 1) for now, send email with contact information
                // TODO: 2) correspondence queue
                IDictionary<string, string> data = new Dictionary<string, string>();
                data.Add("Name", model.Name);
                data.Add("Email", model.Email);
                data.Add("Message", model.Message);

                MailService.SendForm(data, model.Email, "Skyberry Notification: Contact Form Submission");

                return new SkyApiOkeydoke(Request);
            }
            else
            {
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }
        }
    }

    public class ContactBM
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Message is required.")]
        public string Message { get; set; }
    }


}