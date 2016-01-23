﻿using System.Web.Http;
using System.ComponentModel.DataAnnotations;
using Web.Filters;

using Newtonsoft.Json;
using System.Net.Http;

namespace Web.Controllers.api
{
    [RoutePrefix("api/contact")]
    public class ContactController : _BaseApiController
    {
        [Route("")]
        [HttpPost]
        [ValidateModel]
        public IHttpActionResult Index(ContactBM contact)
        {
            if (contact == null) {
                return BadRequest("No data was supplied.");
            }
            return Ok(new { code = 200, description = "okeydoke" });
        }
    }

    public class ContactBM
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string email { get; set; }

        [Required]
        public string message { get; set; }
    }


}