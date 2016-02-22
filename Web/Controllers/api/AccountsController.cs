using Skyberry.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.api
{
    [Authorize]
    [RoutePrefix("api/accounts")]
    public class AccountsController : _BaseApiController
    {
        [HttpGet]
        [HttpPost]
        [Route("{id}")]
        public IHttpActionResult Get(string id)
        {
            var account = this.ModelFactory.CreateAccountDetailsVM(UOW.Accounts.GetBillingDetailsById(new Guid(id)));

            if(account == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return Ok(new { code = 200, description = "okeydoke", account = account });
        }

        //[Route("")]
        //public List<AccountVM> GetAll()
        //{
        //    List<Account> accounts = UOW.Accounts.GetByUserId(this.UserIdentityId);
        //    List<AccountVM> accountList = accounts.Select(e => ModelFactory.CreateAccountVM(e)).ToList();

        //    return accountList;
        //}

        // TODO djw: move parameter into route
        [Route("projects")]
        public List<ProjectVM> GetProjects(string id)
        {
            List<Project> projects = UOW.Accounts.GetOwnAccountProjects(this.UserIdentityId, new Guid(id));
            List<ProjectVM> projectVMs = projects.Select(e => ModelFactory.CreateProjectVM(e)).ToList();

            return projectVMs;
        }
    }
}
