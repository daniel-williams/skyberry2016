using System.Collections.Generic;
using System.Net;
using System.Web.Http.ModelBinding;

namespace Web.Infrastructure
{
    public class SkyModelStateError
    {
        public SkyModelStateError(ModelStateDictionary modelState)
        {
            Status = HttpStatusCode.BadRequest;
            Message = "Bad Request";
            Errors = new Dictionary<string, IEnumerable<string>>();

            foreach (var item in modelState)
            {
                var itemErrors = new List<string>();
                foreach (var err in item.Value.Errors)
                {
                    itemErrors.Add(err.ErrorMessage);
                }
                Errors.Add(item.Key, itemErrors);
            }
        }

        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
        public IDictionary<string, IEnumerable<string>> Errors { get; set; }
    }
}
