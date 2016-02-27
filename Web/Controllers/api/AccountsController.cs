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
        [Route("{id}")]
        public IHttpActionResult Get(string id)
        {

            AccountDetailsVM AccountDetailsVM = this.ModelFactory.CreateAccountDetailsVM(UOW.Accounts.GetBillingDetailsById(new Guid(id)));
            if(AccountDetailsVM == null)
            {
                return new SkyApiNotFound(Request);
            }

            return new SkyApiPayload<AccountDetailsVM>(Request, AccountDetailsVM);
        }

    }
}
