﻿using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web.Controllers.api
{
    public class ApiPayloadResult<T> : IHttpActionResult
    {
        private HttpRequestMessage Request;
        public ApiPayload<T> ApiPayload;

        public ApiPayloadResult(HttpRequestMessage request, T payload)
        {
            Request = request;
            ApiPayload = new ApiPayload<T>(HttpStatusCode.OK, "okeydoke", payload);
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = Request.CreateResponse<ApiPayload<T>>(HttpStatusCode.OK, ApiPayload);
            return Task.FromResult(response);
        }
    }
}
