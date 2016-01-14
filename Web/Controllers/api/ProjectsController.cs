using Skyberry.Domain;
using System;
using System.Web.Http;
using Web.Controllers.api;
using Web.Models;

namespace Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/projects")]
    public class ProjectsController : _BaseApiController
    {

        [Route("")]
        public ProjectVM Get(string id)
        {
            return this.ModelFactory.CreateProjectVM(UOW.Projects.GetProjectById(new Guid(id)));
        }

    }
}
