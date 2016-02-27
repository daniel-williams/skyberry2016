using System;
using System.Collections.Generic;
using System.Net;

namespace Web.Infrastructure
{
    class SkyExceptionError
    {
        public SkyExceptionError(Exception e)
        {
            Status = HttpStatusCode.InternalServerError;
            Message = "Internal Server Error";
            Errors = new Dictionary<string, IEnumerable<string>>();
            var msgs = new List<string>();
            msgs.Add(e.Message);
            Errors.Add(new KeyValuePair<string, IEnumerable<string>>(e.GetType().ToString(), msgs));
        }

        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
        public IDictionary<string, IEnumerable<string>> Errors { get; set; }
    }
}
