using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Web.Infrastructure;

namespace Web.Controllers.api
{
    [RoutePrefix("api/subscribe")]
    public class SubscribeController : _BaseApiController
    {
        [HttpPost]
        [SkyValidateModel]
        [Route("")]
        public IHttpActionResult Index([FromBody]SubscribeBM model)
        {
            if (model == null)
            {
                ModelState.AddModelError("email", "Email is required.");
            }

            if(ModelState.IsValid)
            {
                // 1) for now, send email with subscribe info
                // TODO: 2) correspondence queue
                // TODO: 3) automate subscriptions via MailChimp api
                IDictionary<string, string> data = new Dictionary<string, string>();
                data.Add("Email", model.Email);

                MailService.SendForm(data, model.Email, "Skyberry Notification: Subscribe to Newsletter Form Submission");

                return new SkyApiOkeydoke(Request);
            }
            else
            {
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }
        }
    }

    public class SubscribeBM
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }
    }
}