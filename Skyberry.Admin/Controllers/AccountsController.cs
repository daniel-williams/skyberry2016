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
    public class AccountsController : _BaseController
    {
        public AccountsController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "Name,IndustryType")] AccountSearchCriteria searchCriteria = null)
        {
            AccountListVM vm = new AccountListVM
            {
                Accounts = UOW.Accounts.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Account account = UOW.Accounts.GetById(id);
            if (account == null)
            {
                return HttpNotFound();
            }
            AccountVM vm = new AccountVM
            {
                Account = account
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            AccountVM vm = new AccountVM
            {
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Account")] Account account, [Bind(Include = "Users")] List<Guid> users)
        {
            if (ModelState.IsValid)
            {
                Account newAccount = new Account();
                newAccount.Id = Guid.NewGuid();
                newAccount.Name = account.Name;
                newAccount.ClientSinceDate = account.ClientSinceDate;
                newAccount.CreatedDate = DateTime.Now;
                newAccount.IndustryType = account.IndustryType;
                newAccount.IsActive = account.IsActive;


                Counter dbCounter = UOW.Counters.GetByName("Account_Number");
                int nextNumber = dbCounter.CurrentNumber = dbCounter.CurrentNumber + 1;

                newAccount.Number = nextNumber.ToString();

                if (users != null)
                {
                    newAccount.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                }

                UOW.Accounts.Add(newAccount);
                UOW.Commit();
                account = newAccount;
            }
            AccountVM vm = new AccountVM
            {
                Account = account,
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View("Edit", vm);
        }

        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Account account = UOW.Accounts.GetById(id);
            if (account == null)
            {
                return HttpNotFound();
            }
            AccountVM vm = new AccountVM
            {
                Account = account,
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Account")] Account account, [Bind(Include = "Users")] List<Guid> users)
        {
            if (ModelState.IsValid)
            {
                Account dbAccount = UOW.Accounts.GetById(account.Id);
                if (dbAccount != null)
                {
                    dbAccount.Name = account.Name;
                    dbAccount.ClientSinceDate = account.ClientSinceDate;
                    dbAccount.IndustryType = account.IndustryType;
                    dbAccount.IsActive = account.IsActive;

                    if (users != null)
                    {
                        dbAccount.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                    }

                    UOW.Commit();
                    account = dbAccount;
                }
                else
                {
                    return HttpNotFound();
                }
            }
            AccountVM vm = new AccountVM
            {
                Account = account,
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View(vm);
        }

        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Account account = UOW.Accounts.GetById(id);
            if (account == null)
            {
                return HttpNotFound();
            }
            AccountVM vm = new AccountVM
            {
                Account = account
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Account account = UOW.Accounts.GetById(id);
            if (account == null)
            {
                return HttpNotFound();
            }
            UOW.Accounts.Delete(account);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
