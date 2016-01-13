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
    public class AddressesController : _BaseController
    {
        public AddressesController(IUnitOfWork uow, ICacheProvider cache) : base(uow, cache) { }

        public ActionResult Index([Bind(Include = "Page, Sort")] PageSortCriteria pageSortCriteria, [Bind(Include = "AddressType, Locality, Region")] AddressSearchCriteria searchCriteria = null)
        {
            AddressListVM vm = new AddressListVM
            {
                Addresses = UOW.Addresses.GetAllPaged(pageSortCriteria, searchCriteria),
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
            Address address = UOW.Addresses.GetById(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            AddressVM vm = new AddressVM
            {
                Address = address
            };
            return View(vm);
        }

        public ActionResult Create()
        {
            AddressVM vm = new AddressVM
            {
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View("Edit", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Prefix = "Address")] Address address, [Bind(Include = "Accounts")] List<Guid> accounts, [Bind(Include = "Users")] List<Guid> users)
        {
            if (ModelState.IsValid)
            {
                if (accounts == null && users == null)
                {
                    ModelState.AddModelError(string.Empty, "Address must be associated with at least one account or user.");
                }
                else
                {
                    Address newAddress = new Address();
                    newAddress.AddressId = Guid.NewGuid();
                    newAddress.AddressType = address.AddressType;
                    newAddress.Line1 = address.Line1;
                    newAddress.Line2 = address.Line2;
                    newAddress.Line3 = address.Line3;
                    newAddress.Line4 = address.Line4;
                    newAddress.Locality = address.Locality;
                    newAddress.Region = address.Region;
                    newAddress.PostCode = address.PostCode;
                    newAddress.Country = address.Country;

                    newAddress.Accounts.Clear();
                    if (accounts != null)
                    {
                        newAddress.Accounts = UOW.Accounts.GetSetByIds(accounts);
                    }

                    newAddress.SkyberryUsers.Clear();
                    if (users != null)
                    {
                        newAddress.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                    }

                    UOW.Addresses.Add(newAddress);
                    UOW.Commit();
                    address = newAddress;
                }
            }
            AddressVM vm = new AddressVM
            {
                Address = address,
                Accounts = UOW.Accounts.GetAll(),
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
            Address address = UOW.Addresses.GetById(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            AddressVM vm = new AddressVM
            {
                Address = address,
                Accounts = UOW.Accounts.GetAll(),
                Users = UOW.SkyberryUsers.GetAll()
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Prefix = "Address")] Address address, [Bind(Include = "Accounts")] List<Guid> accounts, [Bind(Include = "Users")] List<Guid> users)
        {
            Address dbAddress = UOW.Addresses.GetById(address.AddressId);
            if (dbAddress != null)
            {
                if (accounts == null && users == null)
                {
                    ModelState.AddModelError(string.Empty, "Address must be associated with at least one account or user.");
                }
                else
                {
                    dbAddress.AddressType = address.AddressType;
                    dbAddress.Line1 = address.Line1;
                    dbAddress.Line2 = address.Line2;
                    dbAddress.Line3 = address.Line3;
                    dbAddress.Line4 = address.Line4;
                    dbAddress.Locality = address.Locality;
                    dbAddress.Region = address.Region;
                    dbAddress.PostCode = address.PostCode;
                    dbAddress.Country = address.Country;

                    dbAddress.Accounts.Clear();
                    if (accounts != null)
                    {
                        dbAddress.Accounts = UOW.Accounts.GetSetByIds(accounts);
                    }

                    dbAddress.SkyberryUsers.Clear();
                    if (users != null)
                    {
                        dbAddress.SkyberryUsers = UOW.SkyberryUsers.GetSetByIds(users);
                    }

                    UOW.Commit();
                    address = dbAddress;
                }
            }
            else
            {
                return HttpNotFound();
            }
            AddressVM vm = new AddressVM
            {
                Address = address,
                Accounts = UOW.Accounts.GetAll(),
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
            Address address = UOW.Addresses.GetById(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            AddressVM vm = new AddressVM
            {
                Address = address
            };
            return View(vm);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Address address = UOW.Addresses.GetById(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            UOW.Addresses.Delete(address);
            UOW.Commit();
            return RedirectToAction("Index");
        }
    }
}
