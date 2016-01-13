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
    public class ReviewDocumentsController : _BaseController
    {
        public ReviewDocumentsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Filename, Title, Version")] ReviewDocumentSearchCriteria searchCriteria = null)
        {
            ReviewDocumentListVM vm = new ReviewDocumentListVM
            {
                ReviewDocuments = UOW.ReviewDocuments.GetAllPaged(pageSortCriteria, searchCriteria),
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
            ReviewDocument contractDocument = UOW.ReviewDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = contractDocument,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = new ReviewDocument(),
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "ReviewDocument")] ReviewDocument contractDocument)
        {
            if (Request.Files.Count > 0 && Request.Files[0].ContentLength > 0)
            {
                HttpPostedFileBase file = Request.Files[0];

                Guid docId = Guid.NewGuid();
                string originalFilename = file.FileName;
                string fileExt = Path.GetExtension(file.FileName);
                string filename = docId.ToString() + fileExt;

                string fullPath = StorageRoot + "\\" + filename;
                file.SaveAs(fullPath);

                ReviewDocument newReviewDocument = new ReviewDocument();

                newReviewDocument.Id = docId;
                newReviewDocument.Filename = filename;
                newReviewDocument.FilenameOriginal = originalFilename;
                newReviewDocument.FileExt = fileExt;
                newReviewDocument.FileMimeType = GetMimeType(fullPath);
                newReviewDocument.FileSize = file.ContentLength;
                newReviewDocument.Title = contractDocument.Title;
                newReviewDocument.Order = contractDocument.Order;
                newReviewDocument.Description = contractDocument.Description;
                newReviewDocument.Version = contractDocument.Version;
                newReviewDocument.CreatedDate = DateTime.Now;
                newReviewDocument.FilePath = "/files";
                newReviewDocument.IsActive = true;
                newReviewDocument.DesignReviewId = contractDocument.DesignReviewId;

                UOW.ReviewDocuments.Add(newReviewDocument);

                UOW.Commit();
                contractDocument = newReviewDocument;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }

            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = contractDocument,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReviewDocument contractDocument = UOW.ReviewDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = contractDocument,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ReviewDocument")] ReviewDocument contractDocument)
        {
            ReviewDocument dbReviewDocument = UOW.ReviewDocuments.GetById(contractDocument.Id);
            if (dbReviewDocument != null)
            {
                dbReviewDocument.Title = contractDocument.Title;
                dbReviewDocument.Order = contractDocument.Order;
                dbReviewDocument.Description = contractDocument.Description;
                dbReviewDocument.Version = contractDocument.Version;
                dbReviewDocument.DocType = contractDocument.DocType;
                dbReviewDocument.IsActive = contractDocument.IsActive;

                UOW.Commit();
                contractDocument = dbReviewDocument;
            }

            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = contractDocument,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ReviewDocument contractDocument = UOW.ReviewDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = contractDocument,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            ReviewDocument contractDocument = UOW.ReviewDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            UOW.ReviewDocuments.Delete(contractDocument);
            UOW.Commit();
            return RedirectToAction("Index");
        }

    }
}
