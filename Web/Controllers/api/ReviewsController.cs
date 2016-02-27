using Skyberry.Domain;
using System;
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
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }

            return new SkyApiPayload<DesignReviewVM>(Request, ModelFactory.CreateDesignReviewVM(review));
        }

        [HttpGet]
        [Route("{rid}/options/{oid}")]
        public IHttpActionResult SelectOption(Guid rid, Guid oid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }
            if(review.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further edits are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            // select option
            review.SelectedReviewDocumentId = oid;
            // clear approval
            review.ApprovedById = null;
            review.ApprovedByName = null;
            review.ApprovedByIp = null;
            review.ApprovedDate = null;
            // clear request
            review.RequestById = null;
            review.RequestByName = null;
            review.RequestByIp = null;
            review.RequestType = RequestType.None;
            review.RequestDate = null;

            UOW.Commit();

            return new SkyApiOkeydoke(Request);
        }

        [HttpGet]
        [Route("{rid}/options/clear")]
        public IHttpActionResult ClearOption(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }
            if (review.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further edits are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            // clear selected option
            review.SelectedReviewDocumentId = null;
            // clear approval
            review.ApprovedById = null;
            review.ApprovedByName = null;
            review.ApprovedByIp = null;
            review.ApprovedDate = null;
            // clear request
            review.RequestById = null;
            review.RequestByName = null;
            review.RequestByIp = null;
            review.RequestType = RequestType.None;
            review.RequestDate = null;

            UOW.Commit();

            return new SkyApiOkeydoke(Request);
        }

        [HttpGet]
        [Route("{rid}/revision")]
        public IHttpActionResult RequestRevision(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }

            review.RequestById = UserIdentityId;
            review.RequestByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.RequestByIp = ""; // TODO djw: record requesting users IP address
            review.RequestType = RequestType.Revision;
            review.RequestDate = DateTime.UtcNow;

            UOW.Commit();
            ReviewRequestVM reviewUpdateVM = new ReviewRequestVM
            {
                RequestById = review.RequestById,
                RequestByName = review.RequestByName,
                RequestByIp = review.RequestByIp,
                RequestType = review.RequestType,
                RequestDate = review.RequestDate,
            };

            return new SkyApiPayload<ReviewRequestVM>(Request, reviewUpdateVM);
        }

        [HttpGet]
        [Route("{rid}/deliverables")]
        public IHttpActionResult RequestDeliverables(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            review.RequestById = UserIdentityId;
            review.RequestByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.RequestByIp = ""; // TODO djw: record requesting users IP address
            review.RequestType = RequestType.Deliverables;
            review.RequestDate = DateTime.UtcNow;

            UOW.Commit();
            ReviewRequestVM reviewUpdateVM = new ReviewRequestVM
            {
                RequestById = review.RequestById,
                RequestByName = review.RequestByName,
                RequestByIp = review.RequestByIp,
                RequestType = review.RequestType,
                RequestDate = review.RequestDate,
            };

            return new SkyApiPayload<ReviewRequestVM>(Request, reviewUpdateVM);
        }

        [HttpGet]
        [Route("{rid}/approve-project")]
        public IHttpActionResult ApproveProject(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }

            review.ApprovedById = UserRecord.Id;
            review.ApprovedByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.ApprovedByIp = ""; // TODO djw: record requesting users IP address
            review.ApprovedDate = DateTime.UtcNow;

            UOW.Commit();
            ReviewApprovedVM reviewApprovedVM = new ReviewApprovedVM
            {
                ApprovedById = review.ApprovedById,
                ApprovedByName = review.ApprovedByName,
                ApprovedByIp = review.ApprovedByIp,
                ApprovedDate = review.ApprovedDate,
            };
            return new SkyApiPayload<ReviewApprovedVM>(Request, reviewApprovedVM);
        }

        [HttpGet]
        [Route("{rid}/clear-request")]
        public IHttpActionResult ClearRequest(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }

            if(review.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further changes are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            review.RequestById = null;
            review.RequestByName = null;
            review.RequestByIp = null;
            review.RequestType = RequestType.None;
            review.RequestDate = null;

            review.ApprovedById = null;
            review.ApprovedByName = null;
            review.ApprovedByIp = null;
            review.ApprovedDate = null;

            UOW.Commit();

            return new SkyApiPayload<ReviewClearVM>(Request, new ReviewClearVM());
        }

        [HttpPost]
        [SkyValidateModel]
        [Route("{rid}/comments")]
        public IHttpActionResult AddComment(Guid rid, [FromBody]ReviewCommentBM model)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                return new SkyApiNotFound(Request);
            }

            if (review.AcceptedDate != null)
            {
                ModelState.AddModelError("", "Review has been accepted and further changes are not allowed.");
                return new SkyApiBadRequest(Request, new SkyModelStateError(ModelState));
            }

            ReviewComment reviewComment = new ReviewComment
            {
                Comment = model.comment,
                // TODO: looks like a typo (OrderId should be OptionId)
                OrderId = new Guid(model.oid),
                DesignReviewId = rid,
                UserId = new Guid(UserRecord.Id),
                Username = UserRecord.UserName
            };
            review.ReviewComments.Add(reviewComment);

            UOW.Commit();

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
