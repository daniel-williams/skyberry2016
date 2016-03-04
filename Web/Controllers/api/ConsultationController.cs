using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Web.Infrastructure;

namespace Web.Controllers.api
{
    [RoutePrefix("api/consultation")]
    public class ConsultationController : _BaseApiController
    {
        [HttpPost]
        [SkyValidateModel]
        [Route("")]
        public IHttpActionResult Index([FromBody]ConsultationBM model)
        {
            if (model == null) {
                ModelState.AddModelError("summary", "Project summary is required.");
                ModelState.AddModelError("email", "Email is required.");
                ModelState.AddModelError("phone", "Phone is required.");
            }

            if(model.Email == null && model.Phone == null)
            {
                ModelState.AddModelError("email", "Email is required.");
                ModelState.AddModelError("phone", "Phone is required.");
            }

            if(ModelState.IsValid)
            {
                // 1) for now, send email with contact information
                // TODO: 2) correspondence queue
                IDictionary<string, string> data = new Dictionary<string, string>();
                data.Add("Name", model.Name);
                data.Add("Email", model.Email);
                data.Add("Phone", model.Phone);
                data.Add("Project Summary", model.Summary);

                MailService.SendForm(model.Email, "Skyberry Free Consultation Form Submission", data);

                return new SkyApiOkeydoke(Request);
            }
            else
            {
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }
        }
    }

    public class ConsultationBM
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone{ get; set; }

        [Required(ErrorMessage = "Project summary is required.")]
        public string Summary{ get; set; }
    }


}