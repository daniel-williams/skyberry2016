using Skyberry.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Web.Controllers.api;
using Web.Models;

namespace Web.Controllers
{
    [RoutePrefix("api/portfolio")]
    public class PortfolioController : _BaseApiController
    {
        [Route("")]
        public IHttpActionResult GetImages(string c = "all", string f = "featured")
        {
            List<Image> images = UOW.Images.PortfolioImages(c, f);
            List<ImageVM> imageVMs = images.Select(e => this.ModelFactory.CreateImageVM(e)).ToList();

            return new SkyApiPayload<List<ImageVM>>(Request, imageVMs);
        }

    }
}
