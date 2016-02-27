using Newtonsoft.Json;
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
        public IHttpActionResult Index([FromBody]ContactBM contact)
        {
            if (contact == null) {
                ModelState.AddModelError("email", "Email is required.");
                ModelState.AddModelError("message", "Message is required.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }
            // TODO: 1) for now, send email with contact information

            // TODO: 2) correspondence queue

            return new SkyApiOkeydoke(Request);
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