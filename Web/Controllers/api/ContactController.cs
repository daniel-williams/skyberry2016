using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using Web.Filters;

namespace Web.Controllers.api
{
    [RoutePrefix("api/contact")]
    public class ContactController : _BaseApiController
    {
        [Route("")]
        [HttpPost]
        [ValidateModel]
        public IHttpActionResult Index([FromBody]ContactBM contact)
        {
            if (contact == null) {
                return BadRequest("No data was supplied.");
            }
            return Ok();
        }
    }

    public class ContactBM
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required, dumbass.")]
        [EmailAddress(ErrorMessage = "Please use a valid email, dumbass.")]
        public string email { get; set; }

        [Required]
        public string message { get; set; }
    }


}