﻿using Newtonsoft.Json;
using Skyberry.Domain;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.api
{
    [RoutePrefix("api/documents")]
    public class DocumentsController : _BaseApiController
    {
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult FileDownload(Guid id)
        {
            var doc = UOW.Documents.GetById(id);
            if (doc == null)
            {
                return new SkyApiNotFound(Request);
            }


            string filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/files/" + doc.Filename);
            if (!System.IO.File.Exists(filePath))
            {
                return new SkyApiNotFound(Request);
            }

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(filePath, FileMode.Open);
            result.Content = new StreamContent(stream);

            result.Content.Headers.ContentType = new MediaTypeHeaderValue(doc.FileMimeType);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = doc.FilenameOriginal
            };

            return ResponseMessage(result); // Note to self -> ResponseMessageResult implements IHttpActionResult
        }
    }
}
