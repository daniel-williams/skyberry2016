using Skyberry.Domain;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using Web.Infrastructure;
using Web.Models;

namespace Web.Controllers.api
{
    [Authorize]
    [RoutePrefix("api/reviews")]
    public class ReviewsController : _BaseApiController
    {
        [HttpGet]
        [Route("{rid}")]
        public IHttpActionResult GetDesignReview(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }

            return new SkyApiPayload<DesignReviewVM>(Request, ModelFactory.CreateDesignReviewVM(dbReview));
        }

        [HttpGet]
        [Route("{rid}/options/{oid}")]
        public IHttpActionResult SelectOption(Guid rid, Guid oid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }
            if(dbReview.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further edits are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            // select option
            dbReview.SelectedReviewDocumentId = oid;
            // clear approval
            dbReview.ApprovedById = null;
            dbReview.ApprovedByName = null;
            dbReview.ApprovedByIp = null;
            dbReview.ApprovedDate = null;
            // clear request
            dbReview.RequestById = null;
            dbReview.RequestByName = null;
            dbReview.RequestByIp = null;
            dbReview.RequestType = RequestType.None;
            dbReview.RequestDate = null;

            UOW.Commit();

            return new SkyApiOkeydoke(Request);
        }

        [HttpGet]
        [Route("{rid}/options/clear")]
        public IHttpActionResult ClearOption(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }
            if (dbReview.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further edits are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            // clear selected option
            dbReview.SelectedReviewDocumentId = null;
            // clear approval
            dbReview.ApprovedById = null;
            dbReview.ApprovedByName = null;
            dbReview.ApprovedByIp = null;
            dbReview.ApprovedDate = null;
            // clear request
            dbReview.RequestById = null;
            dbReview.RequestByName = null;
            dbReview.RequestByIp = null;
            dbReview.RequestType = RequestType.None;
            dbReview.RequestDate = null;

            UOW.Commit();

            return new SkyApiOkeydoke(Request);
        }

        [HttpGet]
        [Route("{rid}/revision")]
        public IHttpActionResult RequestRevision(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }

            dbReview.RequestById = UserIdentityId;
            dbReview.RequestByName = UserRecord.FullName;
            dbReview.RequestByIp = ""; // TODO djw: record requesting users IP address
            dbReview.RequestType = RequestType.Revision;
            dbReview.RequestDate = DateTime.UtcNow;

            UOW.Commit();

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("User", UserRecord.FullName);
            formData.Add("Project", dbReview.Project.Name);
            formData.Add("Review", dbReview.Title);
            formData.Add("Request Type", "Revision");
            MailService.SendNotification(formData, "Skyberry Notification: Revision Request");

            ReviewRequestVM reviewRequestVM = new ReviewRequestVM
            {
                RequestById = dbReview.RequestById,
                RequestByName = dbReview.RequestByName,
                RequestByIp = dbReview.RequestByIp,
                RequestType = dbReview.RequestType,
                RequestDate = dbReview.RequestDate,
            };

            return new SkyApiPayload<ReviewRequestVM>(Request, reviewRequestVM);
        }

        [HttpGet]
        [Route("{rid}/deliverables")]
        public IHttpActionResult RequestDeliverables(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            dbReview.RequestById = UserIdentityId;
            dbReview.RequestByName = UserRecord.FullName;
            dbReview.RequestByIp = ""; // TODO djw: record requesting users IP address
            dbReview.RequestType = RequestType.Deliverables;
            dbReview.RequestDate = DateTime.UtcNow;

            UOW.Commit();

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("User", UserRecord.FullName);
            formData.Add("Project", dbReview.Project.Name);
            formData.Add("Review", dbReview.Title);
            formData.Add("Request Type", "Deliverables");
            MailService.SendNotification(formData, "Skyberry Notification: Deliverables Request");

            ReviewRequestVM reviewRequestVM = new ReviewRequestVM
            {
                RequestById = dbReview.RequestById,
                RequestByName = dbReview.RequestByName,
                RequestByIp = dbReview.RequestByIp,
                RequestType = dbReview.RequestType,
                RequestDate = dbReview.RequestDate,
            };

            return new SkyApiPayload<ReviewRequestVM>(Request, reviewRequestVM);
        }

        [HttpGet]
        [Route("{rid}/approve-project")]
        public IHttpActionResult ApproveProject(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }

            dbReview.ApprovedById = UserRecord.Id;
            dbReview.ApprovedByName = UserRecord.FullName;
            dbReview.ApprovedByIp = ""; // TODO djw: record requesting users IP address
            dbReview.ApprovedDate = DateTime.UtcNow;

            UOW.Commit();

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("User", UserRecord.FullName);
            formData.Add("Project", dbReview.Project.Name);
            formData.Add("Review", dbReview.Title);
            MailService.SendNotification(formData, "Skyberry Notification: Project Approval");

            ReviewApprovedVM reviewApprovedVM = new ReviewApprovedVM
            {
                ApprovedById = dbReview.ApprovedById,
                ApprovedByName = dbReview.ApprovedByName,
                ApprovedByIp = dbReview.ApprovedByIp,
                ApprovedDate = dbReview.ApprovedDate,
            };
            return new SkyApiPayload<ReviewApprovedVM>(Request, reviewApprovedVM);
        }

        [HttpGet]
        [Route("{rid}/clear-request")]
        public IHttpActionResult ClearRequest(Guid rid)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }

            if(dbReview.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further changes are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            dbReview.RequestById = null;
            dbReview.RequestByName = null;
            dbReview.RequestByIp = null;
            dbReview.RequestType = RequestType.None;
            dbReview.RequestDate = null;

            dbReview.ApprovedById = null;
            dbReview.ApprovedByName = null;
            dbReview.ApprovedByIp = null;
            dbReview.ApprovedDate = null;

            UOW.Commit();

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("User", UserRecord.FullName);
            formData.Add("Project", dbReview.Project.Name);
            formData.Add("Review", dbReview.Title);
            MailService.SendNotification(formData, "Skyberry Notification: Request Canceled");

            return new SkyApiPayload<ReviewClearVM>(Request, new ReviewClearVM());
        }

        [HttpPost]
        [SkyValidateModel]
        [Route("{rid}/comments")]
        public IHttpActionResult AddComment(Guid rid, [FromBody]ReviewCommentBM model)
        {
            DesignReview dbReview = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (dbReview == null)
            {
                return new SkyApiNotFound(Request);
            }
            ReviewDocument dbOption = UOW.ReviewDocuments.GetById(model.oid);
            if(dbOption == null)
            {
                return new SkyApiNotFound(Request);
            }

            if (dbReview.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further changes are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            ReviewComment reviewComment = new ReviewComment
            {
                Comment = model.comment,
                // TODO: looks like a typo (OrderId should be OptionId)
                OrderId = dbOption.Id,
                DesignReviewId = rid,
                UserId = new Guid(UserRecord.Id),
                Username = UserRecord.UserName
            };
            dbReview.ReviewComments.Add(reviewComment);

            UOW.Commit();

            IDictionary<string, string> formData = new Dictionary<string, string>();
            formData.Add("User", UserRecord.FullName);
            formData.Add("Project", dbReview.Project.Name);
            formData.Add("Review", dbReview.Title);
            formData.Add("Option", dbOption.Title);
            formData.Add("Commment", model.comment);
            MailService.SendNotification(formData, "Skyberry Notification: New Comment");

            return new SkyApiPayload<ReviewCommentVM>(Request, ModelFactory.CreateReviewCommentVM(reviewComment));
        }

    }


    public class ReviewRequestVM
    {
        public string RequestById { get; set; }
        public string RequestByName { get; set; }
        public string RequestByIp { get; set; }
        public RequestType RequestType { get; set; }
        public DateTime? RequestDate { get; set; }
    }

    public class ReviewApprovedVM
    {
        public string ApprovedById { get; set; }
        public string ApprovedByName { get; set; }
        public string ApprovedByIp { get; set; }
        public DateTime? ApprovedDate { get; set; }
    }

    public class ReviewClearVM
    {
        public string RequestById { get; set; }
        public string RequestByName { get; set; }
        public string RequestByIp { get; set; }
        public RequestType RequestType { get; set; }
        public DateTime? RequestDate { get; set; }

        public string ApprovedById { get; set; }
        public string ApprovedByName { get; set; }
        public string ApprovedByIp { get; set; }
        public DateTime? ApprovedDate { get; set; }

        public ReviewClearVM()
        {
            RequestById = null;
            RequestByName = null;
            RequestByIp = null;
            RequestType = RequestType.None;
            RequestDate = null;

            ApprovedById = null;
            ApprovedByName = null;
            ApprovedByIp = null;
            ApprovedDate = null;
        }
    }
}
