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

        [Route("{id}")]
        public IHttpActionResult GetProject(Guid id)
        {
            Project project = UOW.Projects.GetOwnById(UserIdentityId, id);
            if(project == null)
            {
                return NotFound();
            }

            ProjectVM projectVM = ModelFactory.CreateProjectVM(project);
            return Ok(projectVM);
        }

    }
}
