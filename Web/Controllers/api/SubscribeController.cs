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
        public IHttpActionResult Index([FromBody]SubscribeBM subscribe)
        {
            if (subscribe == null)
            {
                ModelState.AddModelError("email", "Email is required.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            // TODO: 1) send subscribe email
            // TODO: 2) automate subscriptions via MailChimp api

            return new SkyApiOkeydoke(Request);
        }
    }

    public class SubscribeBM
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }
    }
}