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
    public class ProjectDocumentsController : _BaseController
    {
        public ProjectDocumentsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Filename, Title, Version")] ProjectDocumentSearchCriteria searchCriteria = null)
        {
            ProjectDocumentListVM vm = new ProjectDocumentListVM
            {
                ProjectDocuments = UOW.ProjectDocuments.GetAllPaged(pageSortCriteria, searchCriteria),
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
            ProjectDocument projectDocument = UOW.ProjectDocuments.GetById(id);
            if (projectDocument == null)
            {
                return HttpNotFound();
            }
            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = projectDocument,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = new ProjectDocument(),
                Projects = UOW.Projects.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "ProjectDocument")] ProjectDocument projectDocument)
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

                ProjectDocument newProjectDocument = new ProjectDocument();

                newProjectDocument.Id = docId;
                newProjectDocument.Filename = filename;
                newProjectDocument.FilenameOriginal = originalFilename;
                newProjectDocument.FileExt = fileExt;
                newProjectDocument.FileMimeType = GetMimeType(fullPath);
                newProjectDocument.FileSize = file.ContentLength;
                newProjectDocument.Title = projectDocument.Title;
                newProjectDocument.Description = projectDocument.Description;
                newProjectDocument.Version = projectDocument.Version;
                newProjectDocument.CreatedDate = DateTime.Now;
                newProjectDocument.FilePath = "/files";
                newProjectDocument.IsActive = true;
                newProjectDocument.DocType = projectDocument.DocType;
                newProjectDocument.ProjectId = projectDocument.ProjectId;

                UOW.ProjectDocuments.Add(newProjectDocument);

                UOW.Commit();
                projectDocument = newProjectDocument;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }

            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = projectDocument,
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
            ProjectDocument projectDocument = UOW.ProjectDocuments.GetById(id);
            if (projectDocument == null)
            {
                return HttpNotFound();
            }
            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = projectDocument,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ProjectDocument")] ProjectDocument projectDocument)
        {
            ProjectDocument dbProjectDocument = UOW.ProjectDocuments.GetById(projectDocument.Id);
            if (dbProjectDocument != null)
            {
                dbProjectDocument.Title = projectDocument.Title;
                dbProjectDocument.Description = projectDocument.Description;
                dbProjectDocument.Version = projectDocument.Version;
                dbProjectDocument.DocType = projectDocument.DocType;
                dbProjectDocument.IsActive = projectDocument.IsActive;

                UOW.Commit();
                projectDocument = dbProjectDocument;
            }

            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = projectDocument,
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
            ProjectDocument projectDocument = UOW.ProjectDocuments.GetById(id);
            if (projectDocument == null)
            {
                return HttpNotFound();
            }
            ProjectDocumentVM vm = new ProjectDocumentVM
            {
                ProjectDocument = projectDocument,
                Projects = UOW.Projects.GetAll()
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            ProjectDocument projectDocument = UOW.ProjectDocuments.GetById(id);
            if (projectDocument == null)
            {
                return HttpNotFound();
            }
            UOW.ProjectDocuments.Delete(projectDocument);
            UOW.Commit();
            return RedirectToAction("Index");
        }

    }
}
