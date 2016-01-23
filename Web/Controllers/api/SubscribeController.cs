using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using Web.Filters;

using Newtonsoft.Json;
using System.Net.Http;

namespace Web.Controllers.api
{
    [RoutePrefix("api/subscribe")]
    public class SubscribeController : _BaseApiController
    {
        [Route("")]
        [HttpPost]
        [ValidateModel]
        public IHttpActionResult Index([FromBody]SubscribeBM subscribe)
        {
            if (subscribe == null)
            {
                return BadRequest("No data was supplied.");
            }
            return Ok(new { code = 200, description = "okeydoke" });
        }
    }

    public class SubscribeBM
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string email { get; set; }
    }
}