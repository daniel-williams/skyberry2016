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
    public class ContractDocumentsController : _BaseController
    {
        public ContractDocumentsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Filename, Title, Version")] ContractDocumentSearchCriteria searchCriteria = null)
        {
            ContractDocumentListVM vm = new ContractDocumentListVM
            {
                ContractDocuments = UOW.ContractDocuments.GetAllPaged(pageSortCriteria, searchCriteria),
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
            ContractDocument contractDocument = UOW.ContractDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = contractDocument,
                Contracts = UOW.Contracts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = new ContractDocument(),
                Contracts = UOW.Contracts.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "ContractDocument")] ContractDocument contractDocument)
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

                ContractDocument newContractDocument = new ContractDocument();

                newContractDocument.Id = docId;
                newContractDocument.Filename = filename;
                newContractDocument.FilenameOriginal = originalFilename;
                newContractDocument.FileExt = fileExt;
                newContractDocument.FileMimeType = GetMimeType(fullPath);
                newContractDocument.FileSize = file.ContentLength;
                newContractDocument.FilePath = "/files";
                newContractDocument.Title = contractDocument.Title;
                newContractDocument.Description = contractDocument.Description;
                newContractDocument.Version = contractDocument.Version;
                newContractDocument.DocType = contractDocument.DocType;
                newContractDocument.CreatedDate = DateTime.Now;                
                newContractDocument.IsActive = true;
                newContractDocument.ContractId = contractDocument.ContractId;

                UOW.ContractDocuments.Add(newContractDocument);

                UOW.Commit();
                contractDocument = newContractDocument;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }

            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = contractDocument,
                Contracts = UOW.Contracts.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ContractDocument contractDocument = UOW.ContractDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = contractDocument,
                Contracts = UOW.Contracts.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "ContractDocument")] ContractDocument contractDocument)
        {
            ContractDocument dbContractDocument = UOW.ContractDocuments.GetById(contractDocument.Id);
            if (dbContractDocument != null)
            {
                dbContractDocument.Title = contractDocument.Title;
                dbContractDocument.Description = contractDocument.Description;
                dbContractDocument.Version = contractDocument.Version;
                dbContractDocument.DocType = contractDocument.DocType;
                dbContractDocument.IsActive = contractDocument.IsActive;

                UOW.Commit();
                contractDocument = dbContractDocument;
            }

            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = contractDocument,
                Contracts = UOW.Contracts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ContractDocument contractDocument = UOW.ContractDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            ContractDocumentVM vm = new ContractDocumentVM
            {
                ContractDocument = contractDocument,
                Contracts = UOW.Contracts.GetAll()
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            ContractDocument contractDocument = UOW.ContractDocuments.GetById(id);
            if (contractDocument == null)
            {
                return HttpNotFound();
            }
            UOW.ContractDocuments.Delete(contractDocument);
            UOW.Commit();
            return RedirectToAction("Index");
        }

    }
}
