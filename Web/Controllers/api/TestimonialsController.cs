using Skyberry.Domain;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using Web.Controllers.api;

namespace Web.Controllers
{
    [RoutePrefix("api/testimonials")]
    public class TestimonialsController : _BaseApiController
    {

        [Route("")]
        public IEnumerable<Testimonial> GetAll()
        {
            var identity = User.Identity as ClaimsIdentity;
            foreach (var claim in identity.Claims)
            {
                Debug.WriteLine("Identity Claims: {0} | {1} | {2}", claim.Subject.Name, claim.Type, claim.Value ?? "");
            }

            var testimonials = UOW.Testimonials.GetAll();
            return testimonials;
        }

        [Route("featured")]
        public List<string> GetFeatured()
        {
            List<string> descriptions = UOW.Testimonials.GetFeatured().Select(e => e.Description).ToList();
            return descriptions;
        }

    }
}
