using System;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Skyberry.Domain;
using System.IO;
using Skyberry.Admin.Infrastructure;
using Skyberry.Admin.ViewModels;
using Skyberry.Domain.Linq;
using System.Collections.Generic;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class DesignReviewsController : _BaseController
    {
        public DesignReviewsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Title, Description")] DesignReviewSearchCriteria searchCriteria = null)
        {
            DesignReviewListVM vm = new DesignReviewListVM
            {
                DesignReviews = UOW.DesignReviews.GetAllPaged(pageSortCriteria, searchCriteria),
                PageSortCriteria = pageSortCriteria,
                SearchCriteria = searchCriteria
            };
            return View(vm);
        }

        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DesignReview designReview = UOW.DesignReviews.GetById(id);
            if (designReview == null)
            {
                return HttpNotFound();
            }
            DesignReviewVM vm = new DesignReviewVM
            {
                DesignReview = designReview
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            DesignReviewVM vm = new DesignReviewVM
            {
                Projects = UOW.Projects.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "DesignReview")] DesignReview designReview)
        {
            if (ModelState.IsValid)
            {
                DesignReview newDesignReview = new DesignReview();
                newDesignReview.Id = Guid.NewGuid();
                newDesignReview.Title = designReview.Title;
                newDesignReview.Description = designReview.Description;
                newDesignReview.SelectedComment = designReview.SelectedComment;
                newDesignReview.AdditionalComment = designReview.AdditionalComment;
                newDesignReview.AcceptedDate = designReview.AcceptedDate;
                newDesignReview.IsActive = designReview.IsActive;                
                newDesignReview.ProjectId = designReview.ProjectId;

                UOW.DesignReviews.Add(newDesignReview);
                UOW.Commit();
                designReview = newDesignReview;
            }
            DesignReviewVM vm = new DesignReviewVM
            {
                DesignReview = designReview,
                Projects = UOW.Projects.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DesignReview designReview = UOW.DesignReviews.GetById(id);
            if (designReview == null)
            {
                return HttpNotFound();
            }
            DesignReviewVM vm = new DesignReviewVM
            {
                DesignReview = designReview,
                Projects = UOW.Projects.GetAll()
            };
            System.Diagnostics.Debug.WriteLine(vm);
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "DesignReview")] DesignReview designReview)
        {
            DesignReview dbDesignReview = UOW.DesignReviews.GetById(designReview.Id);
            if (dbDesignReview != null)
            {
                dbDesignReview.Title = designReview.Title;
                dbDesignReview.Description = designReview.Description;
                dbDesignReview.SelectedComment = designReview.SelectedComment;
                dbDesignReview.AdditionalComment = designReview.AdditionalComment;
                dbDesignReview.AcceptedDate = designReview.AcceptedDate;
                dbDesignReview.IsActive = designReview.IsActive;
                dbDesignReview.ProjectId = designReview.ProjectId;

                UOW.Commit();
                designReview = dbDesignReview;
            }

            DesignReviewVM vm = new DesignReviewVM
            {
                DesignReview = designReview,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DesignReview designReview = UOW.DesignReviews.GetById(id);
            if (designReview == null)
            {
                return HttpNotFound();
            }
            DesignReviewVM vm = new DesignReviewVM
            {
                DesignReview = designReview
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            DesignReview designReview = UOW.DesignReviews.GetById(id);
            if (designReview == null)
            {
                return HttpNotFound();
            }
            UOW.DesignReviews.Delete(designReview);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
