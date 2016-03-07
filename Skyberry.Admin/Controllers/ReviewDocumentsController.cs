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
            ReviewDocument dbDoc = UOW.ReviewDocuments.GetById(id);
            if (dbDoc == null)
            {
                return HttpNotFound();
            }
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = dbDoc,
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
        public ActionResult Create([Bind(Prefix = "ReviewDocument")] ReviewDocument model)
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

                ReviewDocument newDoc = new ReviewDocument();

                newDoc.Id = docId;
                newDoc.Filename = filename;
                newDoc.FilenameOriginal = originalFilename;
                newDoc.FileExt = fileExt;
                newDoc.FileMimeType = GetMimeType(fullPath);
                newDoc.FileSize = file.ContentLength;
                newDoc.Title = model.Title;
                newDoc.Order = model.Order;
                newDoc.Description = model.Description;
                newDoc.Version = model.Version;
                newDoc.DocType = model.DocType;
                newDoc.CreatedDate = DateTime.Now;
                newDoc.FilePath = "/files";
                newDoc.IsActive = true;
                newDoc.DesignReviewId = model.DesignReviewId;

                UOW.ReviewDocuments.Add(newDoc);

                UOW.Commit();
                model = newDoc;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }

            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = model,
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
            ReviewDocument dbDoc = UOW.ReviewDocuments.GetById(id);
            if (dbDoc == null)
            {
                return HttpNotFound();
            }
            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = dbDoc,
                DesignReviews = UOW.DesignReviews.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ReviewDocument")] ReviewDocument model)
        {
            ReviewDocument dbReviewDocument = UOW.ReviewDocuments.GetById(model.Id);
            if (dbReviewDocument != null)
            {
                dbReviewDocument.Title = model.Title;
                dbReviewDocument.Order = model.Order;
                dbReviewDocument.Description = model.Description;
                dbReviewDocument.Version = model.Version;
                dbReviewDocument.DocType = model.DocType;
                dbReviewDocument.IsActive = model.IsActive;

                UOW.Commit();
                model = dbReviewDocument;
            }

            ReviewDocumentVM vm = new ReviewDocumentVM
            {
                ReviewDocument = model,
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
