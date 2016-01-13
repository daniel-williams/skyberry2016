using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using System.Collections.Generic;
using Skyberry.Domain.Linq;
using System.Web;
using System.IO;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class InvoicesController : _BaseController
    {
        public InvoicesController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Title, Description, Version")] InvoiceSearchCriteria searchCriteria = null)
        {
            InvoiceListVM vm = new InvoiceListVM
            {
                Invoices = UOW.Invoices.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Invoice invoice = UOW.Invoices.GetById(id);
            if (invoice == null)
            {
                return HttpNotFound();
            }
            InvoiceVM vm = new InvoiceVM
            {
                Invoice = invoice
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            InvoiceVM vm = new InvoiceVM
            {
                Projects = UOW.Projects.GetAll(),
                Accounts = UOW.Accounts.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Invoice")] Invoice invoice)
        {
            if (Request.Files.Count > 0 && Request.Files[0].ContentLength > 0)
            {
                if (ModelState.IsValid)
                {
                    HttpPostedFileBase file = Request.Files[0];

                    Guid docId = Guid.NewGuid();
                    string originalFilename = file.FileName;
                    string fileExt = Path.GetExtension(file.FileName);
                    string filename = docId.ToString() + fileExt;

                    string fullPath = StorageRoot + "\\" + filename;
                    file.SaveAs(fullPath);

                    Invoice newInvoice = new Invoice();
                    newInvoice.Id = docId;
                    newInvoice.Filename = filename;
                    newInvoice.FilenameOriginal = originalFilename;
                    newInvoice.FileExt = fileExt;
                    newInvoice.FileMimeType = GetMimeType(fullPath);
                    newInvoice.FileSize = file.ContentLength;
                    newInvoice.FilePath = "/files";
                    newInvoice.Title = invoice.Title;
                    newInvoice.Amount = invoice.Amount;
                    newInvoice.SentDate = invoice.SentDate;
                    newInvoice.DueDate = invoice.DueDate;
                    newInvoice.IsEstimate = invoice.IsEstimate;
                    newInvoice.IsActive = invoice.IsActive;
                    newInvoice.CreatedDate = DateTime.Now;
                    newInvoice.AccountId = invoice.AccountId;
                    newInvoice.ProjectId = invoice.ProjectId;

                    Counter dbCounter = UOW.Counters.GetByName("Invoice_InvoiceNumber");
                    int nextNumber = dbCounter.CurrentNumber = dbCounter.CurrentNumber + 1;
                    newInvoice.InvoiceNumber = nextNumber.ToString();

                    UOW.Invoices.Add(newInvoice);
                    UOW.Commit();
                    invoice = newInvoice;
                }
            }
            else
            {
                ModelState.AddModelError(string.Empty, "You must supply a valid file.");
            }
            InvoiceVM vm = new InvoiceVM
            {
                Invoice = invoice,
                Projects = UOW.Projects.GetAll(),
                Accounts = UOW.Accounts.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Invoice invoice = UOW.Invoices.GetById(id);
            if (invoice == null)
            {
                return HttpNotFound();
            }
            InvoiceVM vm = new InvoiceVM
            {
                Invoice = invoice,
                Projects = UOW.Projects.GetAll(),
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Invoice")] Invoice invoice)
        {
            if (ModelState.IsValid)
            {
                Invoice dbInvoice = UOW.Invoices.GetById(invoice.Id);
                if (dbInvoice != null)
                {
                    dbInvoice.Title = invoice.Title;
                    dbInvoice.Amount = invoice.Amount;
                    dbInvoice.SentDate = invoice.SentDate;
                    dbInvoice.DueDate = invoice.DueDate;
                    dbInvoice.IsEstimate = invoice.IsEstimate;
                    dbInvoice.IsActive = invoice.IsActive;
                    dbInvoice.AccountId = invoice.AccountId;
                    dbInvoice.ProjectId = invoice.ProjectId;

                    if (Request.Files.Count > 0 && Request.Files[0].ContentLength > 0)
                    {
                        HttpPostedFileBase file = Request.Files[0];

                        Guid docId = Guid.NewGuid();
                        string originalFilename = file.FileName;
                        string fileExt = Path.GetExtension(file.FileName);
                        string filename = docId.ToString() + fileExt;

                        string fullPath = StorageRoot + "\\" + filename;
                        file.SaveAs(fullPath);

                        //dbImage.DocumentId = docId;
                        dbInvoice.Filename = filename;
                        dbInvoice.FileExt = fileExt;
                        dbInvoice.FileMimeType = GetMimeType(fullPath);
                        dbInvoice.FileSize = file.ContentLength;
                    }

                    UOW.Commit();
                    invoice = dbInvoice;
                }
                else
                {
                    return HttpNotFound();
                }
            }
            InvoiceVM vm = new InvoiceVM
            {
                Invoice = invoice,
                Projects = UOW.Projects.GetAll(),
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Invoice invoice = UOW.Invoices.GetById(id);
            if (invoice == null)
            {
                return HttpNotFound();
            }
            InvoiceVM vm = new InvoiceVM
            {
                Invoice = invoice
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Invoice invoice = UOW.Invoices.GetById(id);
            if (invoice == null)
            {
                return HttpNotFound();
            }
            UOW.Invoices.Delete(invoice);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
