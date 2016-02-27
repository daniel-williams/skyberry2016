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

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetProject(Guid id)
        {
            Project project = UOW.Projects.GetOwnById(UserIdentityId, id);
            if(project == null)
            {
                return new SkyApiNotFound(Request);
            }

            ProjectVM projectVM = ModelFactory.CreateProjectVM(project);

            return new SkyApiPayload<ProjectVM>(Request, projectVM);
        }

    }
}
