using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Skyberry.Domain;
using Skyberry.Admin.ViewModels;
using System.Collections.Generic;
using Skyberry.Domain.Linq;

namespace Skyberry.Admin.Controllers
{
    [RequireHttps]
    [Authorize(Roles = "Admin")]
    public class PaymentsController : _BaseController
    {
        public PaymentsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Amount, PaymentType")] PaymentSearchCriteria searchCriteria = null)
        {
            PaymentListVM vm = new PaymentListVM
            {
                Payments = UOW.Payments.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Payment payment = UOW.Payments.GetById(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            PaymentVM vm = new PaymentVM
            {
                Payment = payment,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            PaymentVM vm = new PaymentVM
            {
                Accounts = UOW.Accounts.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Payment")] Payment payment)
        {
            if (ModelState.IsValid)
            {
                Payment newPayment = new Payment();
                newPayment.Id = Guid.NewGuid();
                newPayment.Amount = payment.Amount;
                newPayment.PaymentType = payment.PaymentType;
                newPayment.PaymentDate = payment.PaymentDate;
                newPayment.CreatedDate = DateTime.Now;
                newPayment.AccountId = payment.AccountId;

                UOW.Payments.Add(newPayment);
                UOW.Commit();
                payment = newPayment;
            }
            PaymentVM vm = new PaymentVM
            {
                Payment = payment,
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
            Payment payment = UOW.Payments.GetById(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            PaymentVM vm = new PaymentVM
            {
                Payment = payment,
                Accounts = UOW.Accounts.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Payment")] Payment payment)
        {
            Payment dbPayment = UOW.Payments.GetById(payment.Id);
            if (dbPayment != null)
            {
                dbPayment.Amount = payment.Amount;
                dbPayment.PaymentType = payment.PaymentType;
                dbPayment.PaymentDate = payment.PaymentDate;
                dbPayment.AccountId = payment.AccountId;

                UOW.Commit();
                payment = dbPayment;
            }
            else
            {
                return HttpNotFound();
            }
            PaymentVM vm = new PaymentVM
            {
                Payment = payment,
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
            Payment payment = UOW.Payments.GetById(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            PaymentVM vm = new PaymentVM
            {
                Payment = payment
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Payment payment = UOW.Payments.GetById(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            UOW.Payments.Delete(payment);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
