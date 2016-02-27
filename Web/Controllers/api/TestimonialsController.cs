using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Web.Controllers.api;


namespace Web.Controllers
{
    [RoutePrefix("api/testimonials")]
    public class TestimonialsController : _BaseApiController
    {

        [Route("")]
        public IHttpActionResult GetFeatured()
        {
            List<string> testimonials = UOW.Testimonials.GetFeatured().Select(e => e.Description).ToList();

            return new SkyApiPayload<List<string>>(Request, testimonials);
        }

        [HttpGet]
        [Route("boom")]
        public IHttpActionResult  Boom()
        {
            throw new System.Exception("Boom goes the dynamite!");
        }

    }
}
