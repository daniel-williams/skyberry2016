using Newtonsoft.Json;
using Skyberry.Domain;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers.api
{
    [Authorize]
    [RoutePrefix("api/reviews")]
    public class ReviewsController : _BaseApiController
    {
        [HttpGet]
        [HttpPost]
        [Route("{rid}/options/{oid}")]
        public IHttpActionResult SelectOption(Guid rid, Guid oid)
        {
            DesignReview review = this.FindReview(rid);

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

            return Ok(new { code = 200, description = "okeydoke" });
        }

        // TODO djw: route check (just clearing property on Review)
        [HttpGet]
        [HttpPost]
        [Route("{rid}/options/clear")]
        public IHttpActionResult ClearOption(Guid rid)
        {
            DesignReview review = this.FindReview(rid);

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

            return Ok(new { code = 200, description = "okeydoke" }); //return CreatedAtRoute("GetDesignReview", new { rid = review.Id }, ModelFactory.createDesignReviewVM(review));
        }


        [Route("{rid}/revision")]
        public IHttpActionResult RequestRevision(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (review.SelectedReviewDocumentId == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            review.RequestById = UserIdentityId;
            review.RequestByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.RequestByIp = ""; // TODO djw: record requesting users IP address
            review.RequestType = RequestType.Revision;
            review.RequestDate = DateTime.UtcNow;

            UOW.Commit();

            return CreatedAtRoute("GetDesignReview", new { rid = review.Id }, ModelFactory.createDesignReviewVM(review));
        }

        [Route("{rid}/deliverables")]
        public IHttpActionResult RequestDeliverables(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (review.SelectedReviewDocumentId == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            review.RequestById = UserIdentityId;
            review.RequestByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.RequestByIp = ""; // TODO djw: record requesting users IP address
            review.RequestType = RequestType.Deliverables;
            review.RequestDate = DateTime.UtcNow;

            UOW.Commit();

            return CreatedAtRoute("GetDesignReview", new { rid = review.Id }, ModelFactory.createDesignReviewVM(review));
        }

        [Route("{rid}/approve-project")]
        public IHttpActionResult ApproveProject(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (review.SelectedReviewDocumentId == null || review.RequestDate == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            review.ApprovedById = UserIdentityId;
            review.ApprovedByName = UserRecord.FirstName + " " + UserRecord.LastName;
            review.ApprovedByIp = ""; // TODO djw: record requesting users IP address
            review.ApprovedDate = DateTime.UtcNow;

            UOW.Commit();

            return CreatedAtRoute("GetDesignReview", new { rid = review.Id }, ModelFactory.createDesignReviewVM(review));
        }

        [Route("{rid}/clear-request")]
        public HttpResponseMessage ClearRequest(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if(review.AcceptedDate != null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
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

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            return response;
        }

        [Route("{rid}/comments/{cid}", Name ="GetComment")]
        public ReviewComment GetComment(Guid rid, string cid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var c = review.ReviewComments.Where(e => e.Id == cid).FirstOrDefault();
            if(c == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return c;
        }

        [Route("{rid}/comments")]
        public IHttpActionResult AddComment(Guid rid, ReviewCommentBM comment)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (review.AcceptedDate != null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var item = new ReviewComment
            {
                Comment = comment.Comment,
                OrderId = new Guid(comment.Oid),
                DesignReviewId = rid,
                UserId = new Guid(UserRecord.Id),
                Username = UserRecord.UserName
            };
            review.ReviewComments.Add(item);

            UOW.Commit();

            return CreatedAtRoute("GetComment", new { rid = item.DesignReviewId, cid = item.Id }, ModelFactory.createReviewCommmentVM(item));
        }

        [Route("{rid}", Name = "GetDesignReview")]
        public DesignReviewVM GetDesignReview(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return ModelFactory.createDesignReviewVM(review);
        }


        private DesignReview FindReview(Guid rid)
        {
            DesignReview review = UOW.DesignReviews.GetOwnById(rid, UserRecord.Id);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (review.AcceptedDate != null)
            {
                var resMessage = new HttpResponseMessage(HttpStatusCode.BadRequest);
                resMessage.Content = new StringContent(JsonConvert.SerializeObject(new
                {
                    code = HttpStatusCode.BadRequest,
                    error = "Review has been accepted and further changes are not permitted."
                }), Encoding.UTF8, "application/json");
                throw new HttpResponseException(resMessage);
            }

            return review;
        }
    }
}
